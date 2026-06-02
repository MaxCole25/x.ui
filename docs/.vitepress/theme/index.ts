import DefaultTheme from 'vitepress/theme'
import { XButton } from '../../../src/components/basic-components/button'
import { XIcon } from '../../../src/components/basic-components/icon'
import ButtonPlayground from '../components/ButtonPlayground.vue'
import IconGallery from '../components/IconGallery.vue'
import XDocDemo from '../components/XDocDemo.vue'
import '../../../src/styles/index.css'
import '../theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(XButton.name!, XButton)
    app.component(XIcon.name!, XIcon)
    app.component('ButtonPlayground', ButtonPlayground)
    app.component('IconGallery', IconGallery)
    app.component('XDocDemo', XDocDemo)
  }
}
