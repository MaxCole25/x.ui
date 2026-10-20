<script setup lang="ts">
import LocalePreview from './LocalePreview.vue'
import '../../../styles/index.css'

function initState() {
  return { language: 'zh-CN', placeholder: '', width: 800, height: 420, fullWidth: false, fullHeight: false, openRequest: 0, event: '' }
}
</script>

<template>
  <Story title="其它组件/国际化" group="components">
    <Variant title="外观接口" :init-state="initState" :auto-props-disabled="true">
      <template #default="{ state }">
        <div class="locale-preview" :style="{ width: state.fullWidth ? '100%' : `${state.width}px`, height: state.fullHeight ? '100%' : `${state.height}px` }">
          <LocalePreview :language="state.language" :placeholder="state.placeholder" :open-request="state.openRequest" @action="state.event = $event" />
        </div>
      </template>
      <template #controls="{ state }">
        <div class="locale-controls">
          <section><h3>属性</h3><div class="locale-controls__grid">
            <label>语言<select v-model="state.language"><option value="zh-CN">中文</option><option value="en-US">English</option></select></label>
            <label>占位文本<input v-model="state.placeholder" /></label>
            <label>父元素宽度<input v-model.number="state.width" type="number" /></label>
            <label>父元素高度<input v-model.number="state.height" type="number" /></label>
            <label>父元素撑满宽度<input v-model="state.fullWidth" type="checkbox" /></label>
            <label>父元素撑满高度<input v-model="state.fullHeight" type="checkbox" /></label>
          </div></section>
          <section><h3>接口</h3><div class="locale-controls__grid"><button type="button" @click="state.language = 'zh-CN'">setLocale(zhCN)</button><button type="button" @click="state.openRequest++">XMessageBox.confirm</button><span>getLocale / useLocale / translate</span></div></section>
          <section><h3>类型</h3><div class="locale-controls__grid"><span>XUiLocale</span><span>XUiOptions</span><span>LocaleMessages / LocaleMessageKey</span><span>LocaleParams</span></div></section>
          <section><h3>事件</h3><div class="locale-controls__grid"><span>无独立公开事件</span><output>{{ state.event }}</output></div></section>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
.locale-preview { box-sizing: border-box; padding: 10px; display: flex; align-items: center; justify-content: center; }
.locale-controls { display: flex; flex-direction: column; gap: 16px; }
.locale-controls h3 { margin: 0 0 8px; }
.locale-controls__grid { display: grid; grid-template-columns: repeat(4, 180px); gap: 8px; }
.locale-controls__grid label { display: flex; align-items: center; gap: 4px; font-size: 12px; }
.locale-controls__grid input:not([type=checkbox]), .locale-controls__grid select { min-width: 0; flex: 1; width: 65px; }
.locale-controls__grid span, .locale-controls__grid output { min-width: 0; overflow-wrap: anywhere; font-size: 12px; }
</style>
