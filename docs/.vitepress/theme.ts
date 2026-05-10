import DefaultTheme from 'vitepress/theme'
import XUi from '../../../src'
import ButtonPlayground from './components/ButtonPlayground.vue'
import '../../../src/styles/index.css'
import './theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(XUi)
    app.component('ButtonPlayground', ButtonPlayground)
  }
}
