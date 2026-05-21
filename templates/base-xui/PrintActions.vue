<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BaseXMessage as XMessage } from './BaseXMessage'
import { getBaseXConfig } from './baseXConfig'
import type { BaseXSize } from './xSize'
import type {
  BaseXPrintAdapter,
  BaseXPrintDocumentJob,
  BaseXPrinterInfo,
  BaseXPrintRenderRequest,
  BaseXPrintSettings,
} from './types'

const props = withDefaults(defineProps<{
  templatePath?: string
  templateBase64?: string
  templateFileName?: string
  fileName?: string
  data: unknown
  disabled?: boolean
  strictMode?: boolean
  imagePdf?: boolean
  size?: BaseXSize
  printAdapter?: BaseXPrintAdapter
}>(), {
  templatePath: '',
  templateBase64: '',
  templateFileName: '',
  fileName: '打印文档',
  disabled: false,
  strictMode: true,
  imagePdf: false,
  size: 'md',
  printAdapter: undefined,
})

const emit = defineEmits<{
  rendered: [job: BaseXPrintDocumentJob]
  printed: [result: { jobId: string; status: string; message: string }]
  error: [error: unknown]
}>()

const loading = ref(false)
const settingsVisible = ref(false)
const printProgressVisible = ref(false)
const printProgressMessage = ref('正在准备打印任务...')
const printersLoading = ref(false)
const printers = ref<BaseXPrinterInfo[]>([])
const job = ref<BaseXPrintDocumentJob | null>(null)
const settings = ref<BaseXPrintSettings>({
  printerName: null,
  copies: 1,
  duplex: false,
  color: true,
})

const canRender = computed(() => Boolean(props.templatePath || props.templateBase64))
const hasPrintAdapter = computed(() => Boolean(props.printAdapter ?? getBaseXConfig().printAdapter))

function getPrintAdapter() {
  const adapter = props.printAdapter ?? getBaseXConfig().printAdapter
  if (!adapter) {
    throw new Error('未配置打印接口，请通过 BaseXPlugin 或 printAdapter 属性传入打印服务。')
  }
  return adapter
}

async function ensureJob() {
  if (job.value) {
    return job.value
  }

  if (!canRender.value) {
    throw new Error('缺少打印模板。')
  }

  const request: BaseXPrintRenderRequest = {
    templatePath: props.templatePath || null,
    templateBase64: props.templateBase64 || null,
    templateFileName: props.templateFileName || null,
    fileName: props.fileName || '打印文档',
    data: props.data ?? {},
    strictMode: props.strictMode,
    imagePdf: props.imagePdf,
    printSettings: settings.value,
  }
  const rendered = await getPrintAdapter().renderPrintDocument(request)
  job.value = rendered
  emit('rendered', rendered)
  showDiagnostics(rendered)
  return rendered
}

async function withBusy(action: () => Promise<void>) {
  if (props.disabled || loading.value) {
    return
  }

  loading.value = true
  try {
    await action()
  } catch (error) {
    emit('error', error)
    XMessage.error(resolveErrorMessage(error))
  } finally {
    loading.value = false
  }
}

async function handlePrint() {
  await withBusy(async () => {
    if (!settings.value.printerName) {
      await loadSettingsData()
    }
    if (!settings.value.printerName) {
      settingsVisible.value = true
      throw new Error('请先在打印设置中选择打印机。')
    }

    try {
      openPrintProgress('正在生成打印文件...')
      const rendered = await ensureJob()
      printProgressMessage.value = '正在发送到本地打印服务...'
      const result = await getPrintAdapter().submitPrintJob(rendered.jobId, settings.value)
      printProgressMessage.value = '本地打印服务已收到请求，正在提交到打印机...'
      emit('printed', result)
      XMessage.success(result.message || '打印任务已提交。')
    } finally {
      closePrintProgress()
    }
  })
}

async function handlePreview() {
  await withBusy(async () => {
    const rendered = await ensureJob()
    const blob = await getPrintAdapter().fetchPrintPreview(rendered.jobId)
    getBaseXConfig().openPreview(blob)
  })
}

async function handleSource() {
  await withBusy(async () => {
    const rendered = await ensureJob()
    const { blob, fileName } = await getPrintAdapter().fetchPrintSource(rendered.jobId)
    getBaseXConfig().downloadBlob(blob, fileName || rendered.sourceFileName)
  })
}

async function openSettings() {
  settingsVisible.value = true
  await loadSettingsData()
}

async function loadSettingsData() {
  printersLoading.value = true
  try {
    const adapter = getPrintAdapter()
    const [printerItems, savedSettings] = await Promise.all([adapter.getPrinters(), adapter.getPrintSettings()])
    printers.value = printerItems
    settings.value = {
      printerName: savedSettings.printerName || printerItems.find((item) => item.isDefault)?.name || null,
      copies: normalizeCopies(savedSettings.copies),
      duplex: Boolean(savedSettings.duplex),
      color: savedSettings.color !== false,
    }
  } catch (error) {
    emit('error', error)
    XMessage.error('打印设置加载失败，请检查打印服务是否可用。')
  } finally {
    printersLoading.value = false
  }
}

async function saveSettings() {
  try {
    settings.value = await getPrintAdapter().savePrintSettings({
      ...settings.value,
      copies: normalizeCopies(settings.value.copies),
    })
    settingsVisible.value = false
    XMessage.success('打印设置已保存。')
  } catch (error) {
    emit('error', error)
    XMessage.error('打印设置保存失败。')
  }
}

function normalizeCopies(value: unknown) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? Math.min(99, Math.max(1, Math.trunc(numberValue))) : 1
}

function showDiagnostics(rendered: BaseXPrintDocumentJob) {
  const error = rendered.diagnostics.find((item) => item.severity === 'Error')
  if (error) {
    XMessage.warning(error.message)
  }
}

function openPrintProgress(message: string) {
  printProgressMessage.value = message
  printProgressVisible.value = true
}

function closePrintProgress() {
  printProgressVisible.value = false
}

function resolveErrorMessage(error: unknown) {
  const responseData = error && typeof error === 'object' && 'response' in error
    ? (error as { response?: { data?: unknown } }).response?.data
    : null
  if (responseData && typeof responseData === 'object' && 'diagnostics' in responseData) {
    const diagnostics = (responseData as { diagnostics?: Array<{ message?: string }> }).diagnostics ?? []
    const message = diagnostics.find((item) => item.message)?.message
    if (message) {
      return message
    }
  }

  if (responseData && typeof responseData === 'string') {
    return responseData
  }

  return error instanceof Error ? error.message : '打印操作失败。'
}

onMounted(() => {
  if (hasPrintAdapter.value) {
    loadSettingsData()
  }
})
</script>

<template>
  <div class="print-actions">
    <BaseXButtonGroup>
      <BaseXButton :size="size" type="primary" icon="ri-printer-line" :loading="loading" :disabled="disabled || !canRender || !hasPrintAdapter" @click="handlePrint">
        打印
      </BaseXButton>
      <BaseXButton :size="size" icon="ri-eye-line" :loading="loading" :disabled="disabled || !canRender || !hasPrintAdapter" @click="handlePreview">
        预览
      </BaseXButton>
      <BaseXButton :size="size" icon="ri-file-text-line" :loading="loading" :disabled="disabled || !canRender || !hasPrintAdapter" @click="handleSource">
        原件
      </BaseXButton>
      <BaseXButton :size="size" icon="ri-settings-3-line" :disabled="disabled || !hasPrintAdapter" @click="openSettings">
        打印设置
      </BaseXButton>
    </BaseXButtonGroup>

    <BaseXDialog
      v-model="settingsVisible"
      title="打印设置"
      :width="500"
      :height="360"
      :min-width="440"
      :min-height="320"
      :resizable="false"
      :close-on-mask-click="true"
    >
      <BaseXForm label-width="96px" :disabled="printersLoading">
        <BaseXFormItem label="打印机">
          <BaseXSelect v-model="settings.printerName" filterable placeholder="选择打印机" class="print-actions__select">
            <BaseXOption
              v-for="printer in printers"
              :key="printer.name"
              :label="printer.isDefault ? `${printer.name}（默认）` : printer.name"
              :value="printer.name"
            />
          </BaseXSelect>
        </BaseXFormItem>
        <BaseXFormItem label="份数">
          <BaseXInputNumber v-model="settings.copies" :min="1" :max="99" :step="1" />
        </BaseXFormItem>
        <BaseXFormItem label="双面">
          <BaseXSwitch v-model="settings.duplex" />
        </BaseXFormItem>
        <BaseXFormItem label="彩色">
          <BaseXSwitch v-model="settings.color" />
        </BaseXFormItem>
      </BaseXForm>
      <template #footer>
        <div class="print-actions__dialog-footer">
          <BaseXButton @click="settingsVisible = false">取消</BaseXButton>
          <BaseXButton type="primary" :loading="printersLoading" @click="saveSettings">保存</BaseXButton>
        </div>
      </template>
    </BaseXDialog>

    <BaseXDialog
      v-model="printProgressVisible"
      title="打印"
      :width="420"
      :height="190"
      :min-width="360"
      :min-height="180"
      :resizable="false"
      :close-on-mask-click="false"
      :show-close="false"
    >
      <div class="print-actions__progress">
        <BaseXIcon name="loader-4-line" class="print-actions__progress-icon" :icon-size="34" spin />
        <div class="print-actions__progress-content">
          <div class="print-actions__progress-title">正在提交打印</div>
          <div class="print-actions__progress-text">{{ printProgressMessage }}</div>
        </div>
      </div>
    </BaseXDialog>
  </div>
</template>

<style scoped>
.print-actions {
  display: inline-flex;
  align-items: center;
}

.print-actions__select {
  width: 100%;
}

.print-actions__dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.print-actions__progress {
  display: flex;
  align-items: center;
  min-height: 96px;
  gap: 16px;
}

.print-actions__progress-icon {
  flex: 0 0 auto;
  color: var(--color-primary-600);
  animation: print-actions-rotate 1s linear infinite;
}

.print-actions__progress-content {
  min-width: 0;
}

.print-actions__progress-title {
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.print-actions__progress-text {
  margin-top: 6px;
  color: var(--color-text-2);
  font-size: 14px;
  line-height: 22px;
  word-break: break-word;
}

@keyframes print-actions-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
