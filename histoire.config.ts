import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: [
    'src/components/**/*.story.vue'
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
    'src/components/page-builder/PageBuilder.story.vue'
  ],
  tree: {
    groups: [
      {
        id: 'components',
        title: '组件'
      }
    ]
  }
})
