import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import ButtonPlayground from '../components/ButtonPlayground.vue'
import IconGallery from '../components/IconGallery.vue'
import XDocDemo from '../components/XDocDemo.vue'
import ThemePreview from '../components/ThemePreview.vue'
import '../../../src/styles/index.css'
import '../theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('ButtonPlayground', ButtonPlayground)
    app.component('IconGallery', IconGallery)
    app.component('XDocDemo', XDocDemo)
    app.component('ThemePreview', ThemePreview)
  }
}

