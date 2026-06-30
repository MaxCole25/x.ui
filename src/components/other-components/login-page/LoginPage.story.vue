<script setup lang="ts">
import { computed, reactive } from 'vue'
import { XLoginPage } from './index'
import type { LoginPagePreset, LoginPageSectionConfig } from './src/types'
import '../../../styles/index.css'

const state = reactive({
  parentWidth: 1200,
  parentHeight: 720,
  parentFullWidth: true,
  parentFullHeight: false,
  preset: 'finance' as LoginPagePreset,
  loginWidth: 430,
  username: 'admin',
  password: '123456',
  loading: false,
  headerVisible: true,
  footerVisible: true,
  contentLeftVisible: true,
  contentRightVisible: false,
  contentTopVisible: false,
  contentBottomVisible: false,
  contentPadding: '48px',
  contentGap: '48px',
  contentAlign: 'center' as LoginPageSectionConfig['align'],
  contentJustify: 'center' as LoginPageSectionConfig['justify'],
  headerBackgroundColor: '#ffffff',
  contentBackgroundColor: '#6f82c7',
  footerBackgroundColor: '',
  eventLog: '等待操作'
})

const parentStyle = computed(() => ({
  width: state.parentFullWidth ? '100%' : `${state.parentWidth}px`,
  height: state.parentFullHeight ? '100%' : `${state.parentHeight}px`
}))

const header = computed<LoginPageSectionConfig>(() => ({
  visible: state.headerVisible,
  backgroundColor: state.headerBackgroundColor
}))

const footer = computed<LoginPageSectionConfig>(() => ({
  visible: state.footerVisible,
  backgroundColor: state.footerBackgroundColor || undefined
}))

const content = computed<LoginPageSectionConfig>(() => ({
  padding: state.contentPadding,
  gap: state.contentGap,
  align: state.contentAlign,
  justify: state.contentJustify,
  backgroundColor: state.contentBackgroundColor
}))

const contentLeft = computed<LoginPageSectionConfig>(() => ({
  visible: state.contentLeftVisible
}))

const contentRight = computed<LoginPageSectionConfig>(() => ({
  visible: state.contentRightVisible,
  width: 320
}))

const contentTop = computed<LoginPageSectionConfig>(() => ({
  visible: state.contentTopVisible,
  height: 52,
  textColor: '#ffffff'
}))

const contentBottom = computed<LoginPageSectionConfig>(() => ({
  visible: state.contentBottomVisible,
  height: 52,
  textColor: '#ffffff'
}))

const loginProps = computed(() => ({
  username: state.username,
  password: state.password,
  loading: state.loading,
  title: '通用登录',
  description: '内部嵌套 XLogin，业务逻辑通过事件接入'
}))

function writeLog(message: string) {
  state.eventLog = `${new Date().toLocaleTimeString()} ${message}`
}
</script>

<template>
  <Story title="其它组件/LoginPage 登录页" group="components">
    <Variant title="外观接口">
      <div class="login-page-story">
        <div class="login-page-story__preview" :style="parentStyle">
          <XLoginPage
            :preset="state.preset"
            :login-width="state.loginWidth"
            :header="header"
            :footer="footer"
            :content="content"
            :content-left="contentLeft"
            :content-right="contentRight"
            :content-top="contentTop"
            :content-bottom="contentBottom"
            :login-props="loginProps"
            @login="writeLog(`触发登录：${$event.username || '未填写账号'}`)"
            @register="writeLog('点击注册')"
            @send-sms-code="writeLog(`发送短信验证码：${$event || '未填写手机号'}`)"
          >
            <template #content-top>
              <div class="login-page-story__region">内容顶部区域</div>
            </template>
            <template #content-right>
              <div class="login-page-story__region">内容右侧区域</div>
            </template>
            <template #content-bottom>
              <div class="login-page-story__region">内容底部区域</div>
            </template>
          </XLoginPage>
        </div>

        <div class="login-page-story__controls">
          <section>
            <h3>属性</h3>
            <div class="login-page-story__grid">
              <label>
                <span>父元素宽度</span>
                <input v-model.number="state.parentWidth" type="number" />
              </label>
              <label>
                <span>父元素高度</span>
                <input v-model.number="state.parentHeight" type="number" />
              </label>
              <label>
                <span>父元素撑满宽度</span>
                <input v-model="state.parentFullWidth" type="checkbox" />
              </label>
              <label>
                <span>父元素撑满高度</span>
                <input v-model="state.parentFullHeight" type="checkbox" />
              </label>
              <label>
                <span>预设</span>
                <select v-model="state.preset">
                  <option value="finance">finance</option>
                  <option value="recruit">recruit</option>
                  <option value="retail">retail</option>
                  <option value="centered">centered</option>
                  <option value="split">split</option>
                </select>
              </label>
              <label>
                <span>登录宽度</span>
                <input v-model.number="state.loginWidth" type="number" />
              </label>
              <label>
                <span>内容内边距</span>
                <input v-model="state.contentPadding" />
              </label>
              <label>
                <span>内容间距</span>
                <input v-model="state.contentGap" />
              </label>
              <label>
                <span>内容对齐</span>
                <select v-model="state.contentAlign">
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="end">end</option>
                  <option value="stretch">stretch</option>
                </select>
              </label>
              <label>
                <span>内容主轴</span>
                <select v-model="state.contentJustify">
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="end">end</option>
                  <option value="between">between</option>
                  <option value="around">around</option>
                  <option value="evenly">evenly</option>
                </select>
              </label>
              <label>
                <span>顶栏背景色</span>
                <input v-model="state.headerBackgroundColor" type="color" />
              </label>
              <label>
                <span>内容背景色</span>
                <input v-model="state.contentBackgroundColor" type="color" />
              </label>
              <label>
                <span>顶栏显示</span>
                <input v-model="state.headerVisible" type="checkbox" />
              </label>
              <label>
                <span>底栏显示</span>
                <input v-model="state.footerVisible" type="checkbox" />
              </label>
              <label>
                <span>内容左显示</span>
                <input v-model="state.contentLeftVisible" type="checkbox" />
              </label>
              <label>
                <span>内容右显示</span>
                <input v-model="state.contentRightVisible" type="checkbox" />
              </label>
            </div>
          </section>

          <section>
            <h3>接口</h3>
            <div class="login-page-story__grid">
              <label>
                <span>顶区显示</span>
                <input v-model="state.contentTopVisible" type="checkbox" />
              </label>
              <label>
                <span>底区显示</span>
                <input v-model="state.contentBottomVisible" type="checkbox" />
              </label>
              <label>
                <span>登录中</span>
                <input v-model="state.loading" type="checkbox" />
              </label>
              <label>
                <span>账号绑定值</span>
                <input v-model="state.username" />
              </label>
            </div>
          </section>

          <section>
            <h3>类型</h3>
            <div class="login-page-story__types">
              LoginPagePreset、LoginPageSectionConfig、LoginPageAlign、LoginPageJustify、LoginPageDirection、LoginPageBackgroundSize、LoginPageBackgroundRepeat、LoginPageSectionOverflow
            </div>
          </section>

          <section>
            <h3>事件</h3>
            <div class="login-page-story__log">{{ state.eventLog }}</div>
          </section>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.login-page-story {
  display: grid;
  gap: 16px;
}

.login-page-story__preview {
  border: 1px solid #d8e2e8;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: auto;
  padding: 10px;
}

.login-page-story__controls {
  border: 1px solid #d8e2e8;
  display: grid;
  gap: 18px;
  padding: 16px;
}

.login-page-story__controls section {
  display: grid;
  gap: 12px;
}

.login-page-story__controls h3 {
  color: #102a43;
  font-size: 15px;
  margin: 0;
}

.login-page-story__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 180px);
}

.login-page-story__grid label {
  align-items: center;
  display: grid;
  gap: 6px;
  grid-template-columns: 70px minmax(0, 1fr);
  min-width: 0;
}

.login-page-story__grid span {
  color: #334155;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.login-page-story__grid input:not([type='checkbox']),
.login-page-story__grid select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  height: 28px;
  min-width: 0;
  padding: 0 6px;
  width: 100%;
}

.login-page-story__types,
.login-page-story__log {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #334155;
  font-size: 13px;
  line-height: 1.7;
  padding: 10px;
}

.login-page-story__region {
  color: currentColor;
  font-weight: 700;
  opacity: 0.86;
}
</style>
