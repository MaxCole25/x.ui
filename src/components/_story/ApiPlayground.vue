<script setup lang="ts">
import { cloneVNode, computed, createTextVNode, defineComponent, reactive, ref, toRaw, type VNode } from 'vue'
import catalog from '../_meta/api.json'

const props = withDefaults(defineProps<{ component: string; sampleCount?: number; initialProps?: Record<string, unknown>; createInitialProps?: () => Record<string, unknown> }>(), { sampleCount: 1 })
const entry = computed(() => catalog.find(item => item.name === props.component)!)
const groups = ['数据与绑定', '内容与展示', '布局与尺寸', '外观与排版', '状态与交互', '浮层与定位', '组件专有功能']
function cloneScene(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(cloneScene)
  if (value instanceof Date) return new Date(value)
  if (value && typeof value === 'object') {
    const raw = toRaw(value)
    if (Object.getPrototypeOf(raw) === Object.prototype || Object.getPrototypeOf(raw) === null) return Object.fromEntries(Object.entries(raw).map(([name, item]) => [name, cloneScene(item)]))
  }
  return value
}
function initialValues() { return cloneScene(props.createInitialProps?.() ?? props.initialProps ?? {}) as Record<string, unknown> }
const values = reactive<Record<string, unknown>>(initialValues())
function grouped<T extends { group: string }>(items: T[], order = groups) {
  return order.map(name => ({ name, items: items.filter(item => item.group === name) })).filter(group => group.items.length)
}
const slotGroups = computed(() => grouped(entry.value.slots))
const methodGroups = computed(() => grouped(entry.value.methods))
const eventGroups = computed(() => grouped(entry.value.events))
const typeGroups = computed(() => grouped(entry.value.types, ['属性与配置', '事件参数', '插槽契约', '实例与回调', '组件数据']))
const rawValues = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})
const numericModes = reactive<Record<string, 'number' | 'text'>>({})
const parentDefaults = { width: 900, height: 420, fullWidth: false, fullHeight: false }
const parent = reactive({ ...parentDefaults })
const logs = ref<{ name: string; time: string; detail: string }[]>([])
const instance = ref<Record<string, unknown> | null>(null)
const methodArguments = reactive<Record<string, string>>({})
const generation = ref(0)
const slotText = reactive<Record<string, string>>({})
const slotEnabled = reactive<Record<string, boolean>>({})
const slotNames = reactive<Record<string, string>>({})
const SlotPreview = defineComponent({
  setup(_props, { slots }) {
    const decorate = (vnode: VNode): VNode => {
      if (Array.isArray(vnode.children)) {
        const fragment = cloneVNode(vnode)
        fragment.children = vnode.children.map(child => typeof child === 'object' && child !== null && '__v_isVNode' in child ? decorate(child as VNode) : child)
        ;(fragment as VNode & { dynamicChildren: VNode[] | null }).dynamicChildren = null
        return fragment
      }
      if (typeof vnode.type !== 'object') return vnode
      const isTarget = (vnode.type as { name?: string }).name === props.component
      if (isTarget && !entry.value.slots.length) return vnode
      const children = { ...(vnode.children as Record<string, unknown>) }
      if (!isTarget) for (const [name, render] of Object.entries(children)) {
        if (typeof render === 'function') children[name] = (...args: unknown[]) => render(...args).map(decorate)
      }
      for (const slot of isTarget ? entry.value.slots : []) {
        const name = slot.name.includes('${') ? slotNames[slot.name] : slot.name
        if (!name) continue
        if (slotEnabled[slot.name] === false) delete children[name]
        else if (slotText[slot.name]) children[name] = () => [createTextVNode(slotText[slot.name])]
      }
      const result = cloneVNode(vnode)
      children._ = 2
      result.children = children
      result.shapeFlag = (result.shapeFlag & ~(8 | 16)) | 32
      result.patchFlag |= 1024
      return result
    }
    return () => (slots.default?.() ?? []).map(decorate)
  }
})
const parentStyle = computed(() => ({ width: parent.fullWidth ? '100%' : `${parent.width}px`, height: parent.fullHeight ? '100%' : `${parent.height}px` }))
function format(value: unknown) {
  if (value instanceof Event) return `${value.type} (${value.constructor.name})`
  const seen = new WeakSet<object>()
  return JSON.stringify(value, (_key, item) => {
    if (item instanceof Event) return `${item.type} (${item.constructor.name})`
    if (typeof item === 'object' && item !== null) { if (seen.has(item)) return '[循环引用]'; seen.add(item) }
    if (typeof item === 'function') return '[函数]'
    return item
  }, 2) ?? String(value)
}
function record(name: string, args: unknown) {
  logs.value.unshift({ name, time: new Date().toLocaleTimeString(), detail: format(args) })
  logs.value.splice(50)
}
const apiEvents = computed(() => Object.fromEntries(entry.value.events.map(event => [event.name, (...args: unknown[]) => {
  if (event.name.startsWith('update:')) {
    const name = event.name.slice(7)
    values[name] = args[0]
    delete rawValues[name]
    delete errors[name]
    delete numericModes[name]
  }
  record(event.name, args)
}])))
function captureInstance(vnode: VNode) {
  instance.value = (vnode.component?.exposed ?? vnode.component?.proxy ?? null) as Record<string, unknown> | null
}
function reset() {
  for (const object of [values, rawValues, errors, numericModes, methodArguments, slotText, slotEnabled, slotNames]) for (const key of Object.keys(object)) delete object[key]
  Object.assign(values, initialValues())
  Object.assign(parent, parentDefaults)
  instance.value = null
  logs.value = []
  generation.value++
}
function booleanValue(name: string) {
  return Boolean(values[name] ?? entry.value.props.find(item => item.name === name)?.default === 'true')
}
type ControlProp = { name: string; controlType: string; options: string[]; unit: string }
function numericMode(item: ControlProp): 'number' | 'text' {
  if (numericModes[item.name]) return numericModes[item.name]
  if (typeof values[item.name] === 'string') return 'text'
  if (typeof values[item.name] === 'number') return 'number'
  return /(?:width|height|radius)$/i.test(item.name) ? 'number' : 'text'
}
function changeNumericMode(item: ControlProp, mode: 'number' | 'text') {
  const value = values[item.name]
  const cssLength = item.unit === '数字为 px；字符串使用 CSS 单位'
  if (mode === 'number' && typeof value === 'string') {
    const number = Number(cssLength ? value.replace(/px$/, '').trim() : value)
    if (!Number.isFinite(number)) {
      errors[item.name] = '当前字符串无法转换为数字，请先在字符串模式输入数值。'
      return
    }
    values[item.name] = number
  } else if (mode === 'text' && typeof value === 'number') {
    values[item.name] = cssLength ? `${value}px` : String(value)
  }
  numericModes[item.name] = mode
  delete rawValues[item.name]
  delete errors[item.name]
}
function inputKind(item: ControlProp) {
  if (item.controlType === 'callback') return 'callback'
  if (item.controlType === 'boolean') return 'checkbox'
  if (item.options.length) return 'select'
  if (/Color$/.test(item.name) && item.controlType === 'string') return 'color'
  if (item.controlType === 'number') return 'number'
  if (item.controlType === 'number|string') return numericMode(item)
  if (item.controlType === 'string' || item.controlType === 'number|string') return 'text'
  return 'json'
}
function inputValue(item: ControlProp) {
  if (rawValues[item.name] !== undefined) return rawValues[item.name]
  const value = values[item.name]
  if (value === undefined) return ''
  return inputKind(item) === 'json' ? format(value) : value
}
function update(name: string, value: string, kind: string) {
  rawValues[name] = value
  delete errors[name]
  if (!value) {
    if (entry.value.props.find(item => item.name === name)?.required) {
      errors[name] = '必填属性不能取消覆盖；数组或对象请使用有效 JSON 表示空值。'
      return
    }
    delete values[name]
    return
  }
  try { values[name] = kind === 'json' ? JSON.parse(value) : kind === 'number' ? Number(value) : value }
  catch { errors[name] = '请输入有效 JSON；当前预览保留上一次有效值。' }
}
async function callMethod(name: string) {
  try {
    const method = instance.value?.[name]
    if (typeof method !== 'function') { record(name, '当前实例未暴露可调用方法'); return }
    const args: unknown = JSON.parse(methodArguments[name] || '[]')
    if (!Array.isArray(args)) { record(name, '参数须为 JSON 数组'); return }
    record(name, await method(...args))
  } catch (error) { record(name, String(error)) }
}
</script>

<template>
  <div v-if="entry" class="api-playground">
    <div class="api-playground__toolbar">
      <strong>{{ component }}</strong>
      <button type="button" @click="reset">恢复默认</button>
    </div>
    <p v-if="initialProps || createInitialProps" class="api-playground__scene-note">预览与控件共用场景初值；恢复默认会还原初始场景。</p>
    <div class="api-playground__preview">
      <div class="api-playground__parent" :style="parentStyle">
        <button v-if="entry.props.some(item => item.name === 'modelValue' && item.type === 'boolean')" type="button" @click="values.modelValue = !booleanValue('modelValue')">切换绑定状态</button>
        <SlotPreview v-for="index in sampleCount" :key="`${generation}-${index}`"><slot :api-props="values" :style-props="values" :api-events="apiEvents" :capture-instance="captureInstance" /></SlotPreview>
      </div>
    </div>
    <section>
      <h3>属性</h3>
      <fieldset><legend>预览容器</legend><div class="api-playground__grid">
        <label><span>父元素宽度</span><input v-model.number="parent.width" type="number" /></label>
        <label><span>父元素高度</span><input v-model.number="parent.height" type="number" /></label>
        <label><span>父元素撑满宽度</span><input v-model="parent.fullWidth" type="checkbox" /></label>
        <label><span>父元素撑满高度</span><input v-model="parent.fullHeight" type="checkbox" /></label>
      </div></fieldset>
      <template v-for="group in groups" :key="group">
        <fieldset v-if="entry.props.some(item => item.group === group)"><legend>{{ group }}</legend><div class="api-playground__grid">
          <label v-for="item in entry.props.filter(item => item.group === group)" :key="item.name" :title="`${item.name}：${item.description || item.type}；默认：${item.default}；${item.defaultNote}；单位：${item.unit}`">
            <span>{{ item.description?.split('，')[0] || item.name }}</span>
            <small v-if="inputKind(item) === 'callback'">由场景提供，签名见类型。</small>
            <input v-else-if="inputKind(item) === 'checkbox'" :checked="booleanValue(item.name)" type="checkbox" @change="values[item.name] = ($event.target as HTMLInputElement).checked" />
            <select v-else-if="inputKind(item) === 'select'" :value="values[item.name] ?? ''" @change="update(item.name, ($event.target as HTMLSelectElement).value, 'text')"><option value="">默认</option><option v-for="option in item.options" :key="option">{{ option }}</option></select>
            <input v-else-if="inputKind(item) === 'color'" :value="values[item.name] ?? '#ffffff'" type="color" @input="update(item.name, ($event.target as HTMLInputElement).value, 'text')" />
            <input v-else :type="inputKind(item) === 'number' ? 'number' : 'text'" :value="inputValue(item)" :placeholder="item.default" :aria-invalid="!!errors[item.name]" @change="update(item.name, ($event.target as HTMLInputElement).value, inputKind(item))" />
            <select v-if="item.controlType === 'number|string'" :value="numericMode(item)" :aria-label="`${item.name} 输入方式`" @change="changeNumericMode(item, ($event.target as HTMLSelectElement).value as 'number' | 'text')"><option value="number">数值</option><option value="text">字符串</option></select>
            <small v-if="item.defaultNote">{{ item.defaultNote }}</small>
            <small v-if="errors[item.name]">{{ errors[item.name] }}</small>
          </label>
        </div></fieldset>
      </template>
    </section>
    <section><h3>接口</h3>
      <fieldset v-for="group in slotGroups" :key="group.name"><legend>插槽 · {{ group.name }}</legend><div class="api-playground__grid"><div v-for="slot in group.items" :key="slot.name"><label><span :title="slot.name">{{ slot.name }}</span><input type="checkbox" :checked="slotEnabled[slot.name] !== false" @change="slotEnabled[slot.name] = ($event.target as HTMLInputElement).checked" /></label><input v-if="slot.name.includes('${')" v-model="slotNames[slot.name]" placeholder="实际插槽名称" /><input v-model="slotText[slot.name]" placeholder="替换插槽文本" /><p>{{ slot.type }}</p><small>未填写时保留场景内容。</small></div></div></fieldset>
      <fieldset v-for="group in methodGroups" :key="group.name"><legend>实例方法 · {{ group.name }}</legend><div class="api-playground__grid"><label v-for="method in group.items" :key="method.name"><span :title="method.name">{{ method.name }}</span><input v-model="methodArguments[method.name]" placeholder="参数 JSON 数组" /><button type="button" @click="callMethod(method.name)">调用</button></label></div></fieldset>
      <p v-if="!entry.slots.length && !entry.methods.length">无公开插槽和实例方法。</p>
    </section>
    <section><h3>类型</h3><p>公开类型可从包名导入；关联类型仅用于理解接口定义，未从包主入口直接导出。</p><fieldset v-for="group in typeGroups" :key="group.name"><legend>{{ group.name }}</legend><div class="api-playground__grid"><details v-for="type in group.items" :key="type.name"><summary>{{ type.name }}{{ type.exported ? '' : '（关联类型）' }}</summary><pre>{{ type.definition }}</pre></details></div></fieldset></section>
    <section><h3>事件</h3><fieldset v-for="group in eventGroups" :key="group.name"><legend>{{ group.name }}</legend><div class="api-playground__grid"><div v-for="event in group.items" :key="event.name"><strong>{{ event.name }}</strong><p>{{ event.type }}</p></div></div></fieldset>
      <button type="button" @click="logs = []">清空日志</button><p v-if="!logs.length">操作预览组件查看事件名称、时间和参数。</p>
      <pre v-for="(log, index) in logs" :key="index">{{ log.time }} {{ log.name }} {{ log.detail }}</pre>
    </section>
  </div>
</template>

<style scoped>
.api-playground { color: #243247; font: 14px/1.5 var(--x-font-family); min-width: 780px; }
.api-playground__toolbar { display: flex; align-items: center; gap: 12px; padding: 10px; }
.api-playground__preview { padding: 16px; overflow: auto; background: #f3f6fa; min-height: 160px; height: 480px; }
.api-playground__parent { padding: 10px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; background: white; }
section { margin-top: 18px; padding: 12px; border: 1px solid #dbe2eb; border-radius: 6px; }
h3 { margin: 0 0 12px; font-size: 16px; }
fieldset { border: 0; border-top: 1px solid #e2e8f0; margin: 12px 0 0; padding: 12px 0; }
legend { padding-right: 10px; font-weight: 600; }
.api-playground__grid { display: grid; grid-template-columns: repeat(4, 180px); gap: 10px; }
.api-playground__grid > * { min-width: 0; overflow-wrap: anywhere; }
label { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
label > span { flex: 0 0 72px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
input, select { box-sizing: border-box; width: 100px; min-width: 0; height: 28px; border: 1px solid #cbd5e1; border-radius: 4px; }
input[type=checkbox] { width: 16px; height: 16px; }
input[type=color] { width: 48px; }
button { padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; background: white; }
p { margin: 4px 0; }
small { color: #64748b; }
pre { white-space: pre-wrap; overflow-wrap: anywhere; background: #f8fafc; padding: 8px; }
details { margin: 8px 0; }
</style>

