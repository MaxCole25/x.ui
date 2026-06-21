<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const rules = { username: [{ required: true, message: '请输入用户名称' }] }

const username = ref('')

const password = ref('')

const status = ref('enabled')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]

const enabled = ref(true)

function validate() {
  result.value = '已触发表单校验'
}

function reset() {
  form.value = { username: '', password: '', status: 'enabled', remark: '' }
}

const result = ref('')

const hasDrawing = ref(false)

const reviewed = ref(false)

const archived = ref(false)

const remark = ref('')

const formBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const rules = { username: [{ required: true, message: '请输入用户名称' }] }

const username = ref('')

const password = ref('')

const status = ref('enabled')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]

const enabled = ref(true)

function validate() {
  result.value = '已触发表单校验'
}

function reset() {
  form.value = { username: '', password: '', status: 'enabled', remark: '' }
}

const result = ref('')
<\/script>

<XForm ref="formRef" :model="form" :rules="rules" label-width="96px" style="max-width: 560px">
    <XFormItem label="用户名" prop="username" required>
      <XInput v-model="form.username" placeholder="请输入用户名" clearable />
    </XFormItem>
    <XFormItem label="密码" prop="password" required help="密码不少于 6 个字符。">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    <XFormItem label="状态" prop="status">
      <XSelect v-model="form.status" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch v-model="form.enabled" active-text="启用" inactive-text="停用" />
    </XFormItem>
    <XFormItem label="操作">
      <div class="x-demo-row" style="margin: 0">
        <XButton style="width: auto" @click="validate">校验</XButton>
        <XButton variant="outline" style="width: auto" @click="reset">重置</XButton>
        <span>{{ result }}</span>
      </div>
    </XFormItem>
  </XForm>`

const formInheritCode = `\x3Cscript setup lang="ts">
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<XForm size="sm" disabled style="max-width: 520px">
    <XFormItem label="用户名">
      <XInput model-value="整表禁用" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect model-value="todo" :options="statusOptions" />
    </XFormItem>
  </XForm>`

const formSlotCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const username = ref('')
<\/script>

<XForm label-position="top" style="max-width: 420px">
    <XFormItem prop="username" error="用户名称需要保持唯一。">
      <template #label>用户名称</template>
      <XInput v-model="form.username" placeholder="请输入用户名称" status="error" />
      <template #error>用户名称需要保持唯一。</template>
    </XFormItem>
    <XFormItem label="备注">
      <XInput placeholder="请输入备注" />
      <template #help>帮助文本可用来解释字段填写规则。</template>
    </XFormItem>
  </XForm>`

const formCompactCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const hasDrawing = ref(false)

const reviewed = ref(false)

const archived = ref(false)
<\/script>

<div class="x-demo-row" style="align-items: center; flex-wrap: wrap; gap: 12px 18px; margin: 0">
    <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.hasDrawing" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已复核" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.reviewed" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已归档" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.archived" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
  </div>`

const formAlignCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const enabled = ref(true)

const status = ref('enabled')
<\/script>

<XForm label-position="left" label-width="86px" style="max-width: 360px">
    <XFormItem label="含税" content-justify="end">
      <XSwitch v-model="form.enabled" />
    </XFormItem>
    <XFormItem label="付款方式" content-align="center">
      <XInput v-model="form.status" text-align="center" />
    </XFormItem>
  </XForm>`

const formFullHeightCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const remark = ref('')
<\/script>

<div style="height: 320px; min-height: 0; max-width: 640px">
      <XFormItem label="备注" label-position="top" content-full-height>
        <XRichTextEditor v-model="form.remark" full-height :show-outline="false" />
      </XFormItem>
    </div>`

const formThemeCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const form = ref({ username: '', password: '', status: 'enabled', remark: '' })

const username = ref('')
<\/script>

<div style="background: #020617; border: 1px solid #1e293b; border-radius: 6px; padding: 16px">
    <XForm label-position="left" label-width="86px" style="max-width: 520px">
      <XFormItem
        label="审批人"
        required
        help="通过 props 覆盖当前表单项配色。"
        label-text-color="#dbeafe"
        content-text-color="#f8fafc"
        background-color="#111827"
        border-color="#334155"
        required-mark-color="#fb7185"
        hint-text-color="#94a3b8"
        style="--x-form-item-border-width: 1px; border-radius: 6px; padding: 10px 12px;"
      >
        <XInput v-model="form.username" background-color="#0f172a" border-color="#475569" text-color="#f8fafc" placeholder="请输入审批人" />
      </XFormItem>
    </XForm>
  </div>`
</script>

# Form 表单

`XForm` 和 `XFormItem` 用于统一企业业务表单的布局、标签宽度、尺寸、禁用状态、校验行为和错误提示。业务项目应优先使用 `XForm` / `XFormItem`，避免直接散落使用底层表单实现。

## 基础用法

<XDocDemo title="基础用法" :code="formBasicCode">
  <XForm ref="formRef" :model="form" :rules="rules" label-width="96px" style="max-width: 560px">
    <XFormItem label="用户名" prop="username" required>
      <XInput v-model="form.username" placeholder="请输入用户名" clearable />
    </XFormItem>
    <XFormItem label="密码" prop="password" required help="密码不少于 6 个字符。">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    <XFormItem label="状态" prop="status">
      <XSelect v-model="form.status" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch v-model="form.enabled" active-text="启用" inactive-text="停用" />
    </XFormItem>
    <XFormItem label="操作">
      <div class="x-demo-row" style="margin: 0">
        <XButton style="width: auto" @click="validate">校验</XButton>
        <XButton variant="outline" style="width: auto" @click="reset">重置</XButton>
        <span>{{ result }}</span>
      </div>
    </XFormItem>
  </XForm>
</XDocDemo>

## 继承机制

`XForm` 会通过 provide/inject 向下传递 `size`、`disabled`、`labelWidth`、`labelPosition` 和表单实例。输入框、选择器、开关等表单控件会自动继承尺寸和禁用状态。
尺寸继承采用统一预设：`sm` 标签字号和控件高度为 `10px / 22px`，`md` 为 `12px / 30px`，`lg` 为 `14px / 38px`。左右布局的标签会使用当前控件高度作为最小高度，并在标签区域内垂直居中，避免切换尺寸后标签和输入控件出现视觉错位。

<XDocDemo title="继承机制" :code="formInheritCode">
  <XForm size="sm" disabled style="max-width: 520px">
    <XFormItem label="用户名">
      <XInput model-value="整表禁用" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect model-value="todo" :options="statusOptions" />
    </XFormItem>
  </XForm>
</XDocDemo>

## 标签与插槽

`XFormItem` 支持默认插槽、`#label`、`#help` 和 `#error`，便于业务表单放置复杂标签、辅助说明和统一错误文案。

<XDocDemo title="标签与插槽" :code="formSlotCode">
  <XForm label-position="top" style="max-width: 420px">
    <XFormItem prop="username" error="用户名称需要保持唯一。">
      <template #label>用户名称</template>
      <XInput v-model="form.username" placeholder="请输入用户名称" status="error" />
      <template #error>用户名称需要保持唯一。</template>
    </XFormItem>
    <XFormItem label="备注">
      <XInput placeholder="请输入备注" />
      <template #help>帮助文本可用来解释字段填写规则。</template>
    </XFormItem>
  </XForm>
</XDocDemo>

## 紧凑横向控件

短标签搭配开关、复选框等小控件时，可在 `XFormItem` 上设置 `align="center"`，让标签和控件在垂直方向居中对齐，避免业务页面通过 `:deep` 覆写内部结构。该模式会保留错误和帮助文案的独立换行区域；更推荐用于没有错误提示的状态开关条等紧凑场景。

<XDocDemo title="紧凑横向控件" :code="formCompactCode">
  <div class="x-demo-row" style="align-items: center; flex-wrap: wrap; gap: 12px 18px; margin: 0">
    <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.hasDrawing" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已复核" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.reviewed" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已归档" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.archived" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
  </div>
</XDocDemo>

## 标签与内容对齐

`XFormItem` 提供 `labelAlign`、`contentAlign` 和 `contentJustify` 控制内部 label 与 content 的横向布局。开关、复选框等自身宽度较小的控件可通过 `content-justify="end"` 靠右放置；只读文本或居中输入框可通过 `content-align="center"` 统一控制内容区文本对齐。

<XDocDemo title="标签与内容对齐" :code="formAlignCode">
  <XForm label-position="left" label-width="86px" style="max-width: 360px">
    <XFormItem label="含税" content-justify="end">
      <XSwitch v-model="form.enabled" />
    </XFormItem>
    <XFormItem label="付款方式" content-align="center">
      <XInput v-model="form.status" text-align="center" />
    </XFormItem>
  </XForm>
</XDocDemo>

## 内容区填满高度

父容器有明确高度时，可在 `label-position="top"` 的 `XFormItem` 上开启 `content-full-height`。标签保持自然高度，内容区和字段容器会填满剩余高度，适合放置已经支持 `full-height` 的富文本、表格等复杂控件。

<XDocDemo title="内容区填满高度" :code="formFullHeightCode">
  <ClientOnly>
    <div style="height: 320px; min-height: 0; max-width: 640px">
      <XFormItem label="备注" label-position="top" content-full-height>
        <XRichTextEditor v-model="form.remark" full-height :show-outline="false" />
      </XFormItem>
    </div>
  </ClientOnly>
</XDocDemo>

## 表单项主题配色

`XFormItem` 默认仍保持通用浅色风格。业务系统需要适配暗色主题时，可以通过 props 快速映射到 CSS variables，也可以在父级容器直接覆盖 `--x-form-item-*` 变量，统一控制 label、内容、背景、边框、必填星号、错误提示和辅助说明颜色。

<XDocDemo title="表单项主题配色" :code="formThemeCode">
  <div style="background: #020617; border: 1px solid #1e293b; border-radius: 6px; padding: 16px">
    <XForm label-position="left" label-width="86px" style="max-width: 520px">
      <XFormItem
        label="审批人"
        required
        help="通过 props 覆盖当前表单项配色。"
        label-text-color="#dbeafe"
        content-text-color="#f8fafc"
        background-color="#111827"
        border-color="#334155"
        required-mark-color="#fb7185"
        hint-text-color="#94a3b8"
        style="--x-form-item-border-width: 1px; border-radius: 6px; padding: 10px 12px;"
      >
        <XInput v-model="form.username" background-color="#0f172a" border-color="#475569" text-color="#f8fafc" placeholder="请输入审批人" />
      </XFormItem>
    </XForm>
  </div>
</XDocDemo>

## 暴露方法

`XForm` 通过 `defineExpose` 暴露以下方法：

| 方法 | 说明 |
| --- | --- |
| validate | 校验全部字段，返回 `Promise<boolean>` |
| validateField | 校验指定字段 |
| resetFields | 重置指定字段或全部字段 |
| clearValidate | 清除指定字段或全部字段的校验信息 |
| scrollToField | 滚动到指定字段 |

## XForm Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, unknown>` | - |
| rules | 表单校验规则 | `FormRules` | - |
| disabled | 是否禁用内部组件 | `boolean` | `false` |
| size | 表单尺寸 | `sm \| md \| lg` | `md` |
| inline | 是否行内布局 | `boolean` | `false` |
| height | 表单高度，数字按 px 处理 | `string \| number` | `auto` |
| labelWidth | 标签宽度 | `string \| number` | `96px` |
| labelPosition | 标签位置 | `left \| right \| top` | `right` |
| loading | 是否显示加载遮罩 | `boolean` | `false` |

## XFormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 字段路径 | `string` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 当前项校验规则 | `FormItemRule[]` | - |
| error | 外部错误信息 | `string` | - |
| size | 覆盖当前项尺寸 | `sm \| md \| lg` | - |
| disabled | 覆盖当前项禁用状态 | `boolean` | - |
| help | 帮助文本 | `string` | - |
| contentFullHeight | 内容区是否填满表单项扣除标签后的剩余高度 | `boolean` | `false` |
| align | 标签和内容的垂直对齐方式 | `start \| center` | `start` |
| labelAlign | 标签文本横向对齐方式 | `left \| center \| right` | - |
| contentAlign | 内容区文本横向对齐方式 | `left \| center \| right \| stretch` | - |
| contentJustify | 内容区网格项横向分布方式 | `start \| center \| end \| stretch` | - |
| contentClass | 追加到内容区的 class | `string \| string[] \| Record<string, boolean>` | - |
| contentStyle | 追加到内容区的 style | `string \| Record<string, string \| number>` | - |
| labelClass | 追加到标签的 class | `string \| string[] \| Record<string, boolean>` | - |
| labelStyle | 追加到标签的 style | `string \| Record<string, string \| number>` | - |
| labelTextColor | 标签文字颜色，映射到 `--x-form-item-label-color` | `string` | - |
| labelColor | 标签文字颜色别名，映射到 `--x-form-item-label-color` | `string` | - |
| contentTextColor | 内容区域文字颜色，映射到 `--x-form-item-content-color` | `string` | - |
| backgroundColor | 表单项背景色，映射到 `--x-form-item-bg` | `string` | - |
| borderColor | 表单项边框或分隔线颜色，映射到 `--x-form-item-border-color` | `string` | - |
| requiredMarkColor | 必填星号颜色，映射到 `--x-form-item-required-color` | `string` | - |
| errorTextColor | 错误提示文字颜色，映射到 `--x-form-item-error-color` | `string` | - |
| hintTextColor | 辅助说明文字颜色，映射到 `--x-form-item-hint-color` | `string` | - |
| descriptionTextColor | 辅助说明文字颜色别名，映射到 `--x-form-item-hint-color` | `string` | - |
| loading | 当前项加载状态 | `boolean` | `false` |

## 手动验收建议

- 检查 `sm`、`md`、`lg` 三档下标签、输入框、选择器和开关高度是否协调。
- 检查 `disabled`、`labelWidth`、`labelPosition` 是否能从 `XForm` 自动继承到内部表单项。
- 检查 `validate`、`validateField`、`resetFields`、`clearValidate` 和 `scrollToField` 是否可通过 `ref` 调用。
- 检查错误提示、帮助文本、自定义插槽和加载状态是否符合业务视觉规范。
- 在固定高度父容器内检查 `content-full-height` 搭配 `label-position="top"` 和 `XRichTextEditor full-height` 时，内容区是否填满标签下方剩余高度且不遮挡下一项。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XForm / `FormProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accentColor` | 表单主题色，会作为子表单控件的主题色默认值 | `string` | — |
| `radius` | 圆角，数字按 px 处理 | `string` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
