<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import XCheckbox from '../checkbox/src/Checkbox.vue'
import XForm from './src/Form.vue'
import XFormItem from './src/FormItem.vue'
import XInput from '../input/src/Input.vue'
import XSelect from '../select/src/Select.vue'
import XSwitch from '../switch/src/Switch.vue'

const form = ref({
  name: '',
  status: 'todo',
  enabled: true,
  agree: false
})

const sample = reactive({
  input: '外观接口预览',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36
})

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' }
]

const autocompleteOptions = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]
</script>

<template>
  <Story title="元素/Form 表单" group="components">
    <Variant title="基础用法">
      <XForm style="max-width: 520px" color="#0f766e" border-color="#99f6e4" radius="8px">
        <XFormItem label="名称" required>
          <XInput v-model="form.name" placeholder="请输入名称" />
        </XFormItem>
        <XFormItem label="状态">
          <XSelect
            v-model="form.status"
            :options="[
              { label: '待处理', value: 'todo' },
              { label: '处理中', value: 'doing' }
            ]"
          />
        </XFormItem>
        <XFormItem label="启用">
          <XSwitch v-model="form.enabled" />
        </XFormItem>
        <XFormItem label="确认" help="表单项会继承表单主题变量。">
          <XCheckbox v-model="form.agree">我已确认</XCheckbox>
        </XFormItem>
      </XForm>
    </Variant>

    <Variant title="状态与边界">
      <XForm style="max-width: 520px" label-position="top" disabled>
        <XFormItem label="禁用名称" required message="名称不能为空">
          <XInput v-model="form.name" placeholder="整表禁用" status="error" />
        </XFormItem>
        <XFormItem label="长标签字段名称用于检查换行和对齐" help="帮助信息在禁用状态下仍应可读。">
          <XSelect
            v-model="form.status"
            :options="[
              { label: '待处理', value: 'todo' },
              { label: '处理中', value: 'doing' }
            ]"
          />
        </XFormItem>
      </XForm>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XForm v-bind="styleProps" style="max-width: 520px"><XFormItem label="姓名"><XInput v-model="sample.input" /></XFormItem></XForm>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
