import type { App } from 'vue'
import Card from './src/Card.vue'

export const XCard = Card

export type { CardProps, CardShadow } from './src/types'

XCard.install = (app: App) => {
  app.component(XCard.name!, XCard)
}

export default XCard
