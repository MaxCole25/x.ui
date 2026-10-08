<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XFormItem, XForm } from './index'
import { XInput } from '../input'
import { reactive } from 'vue'
const model = reactive({ name: '' })
import '../../../styles/index.css'
</script>

<template>
  <Story title="Form 组件/FormItem 表单项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XFormItem">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XForm :model="model">
            <XFormItem label="名称" prop="name" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance"><XInput v-model="model.name" placeholder="填写名称" /></XFormItem>
          </XForm>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
