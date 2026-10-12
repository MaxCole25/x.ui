import type { App } from 'vue'
import XGantt from './src/Gantt.vue'
export { XGantt }
export default XGantt
export type * from './src/types'
export function install(app: App) { app.component(XGantt.name!, XGantt) }
