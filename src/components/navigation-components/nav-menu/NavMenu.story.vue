<script setup lang="ts">
import { defineComponent, h, reactive } from 'vue'
import { XNavMenu } from './index'
import type { NavMenuItem, NavMenuMode } from './src/types'
import '../../../styles/index.css'

const ExternalReportIcon = defineComponent({
  name: 'ExternalReportIcon',
  setup() {
    return () =>
      h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          focusable: 'false'
        },
        [
          h('path', { d: 'M4 4h10v16H4z' }),
          h('path', { d: 'M8 9h2' }),
          h('path', { d: 'M8 13h6' }),
          h('path', { d: 'M16 6h4v14h-4' })
        ]
      )
  }
})

const navItems: NavMenuItem[] = [
  { key: 'dashboard', label: '控制台', icon: 'dashboard' },
  {
    key: 'system',
    label: '系统管理',
    icon: 'settings-3',
    children: [
      { key: 'user', label: '用户管理', icon: 'user-settings' },
      {
        key: 'role',
        label: '角色管理',
        icon: 'shield-user',
        children: [
          { key: 'role-list', label: '角色列表', icon: 'list-check' },
          { key: 'role-auth', label: '角色授权', icon: 'verified-badge' }
        ]
      },
      { key: 'permission', label: '权限配置', icon: 'lock-password' }
    ]
  },
  {
    key: 'ops',
    label: '运维中心',
    icon: 'tools',
    children: [
      { key: 'logs', label: '日志检索', icon: 'file-list-3' },
      { key: 'alerts', label: '告警管理', icon: 'alarm-warning' }
    ]
  },
  {
    key: 'business',
    label: '商务部',
    icon: 'briefcase-4',
    children: [
      { key: 'contracts', label: '合同管理', icon: 'file-paper-2' },
      { key: 'orders', label: '订单管理', icon: 'shopping-bag-3' },
      { key: 'customers', label: '客户档案', icon: 'contacts-book-2' }
    ]
  },
  {
    key: 'security',
    label: '权限管理',
    icon: 'ri-shield-keyhole-line',
    children: [
      { key: '/security/roles', label: '角色管理', icon: 'team' },
      { key: '/security/users', label: '用户管理', icon: 'user' }
    ]
  },
  {
    key: 'reports',
    label: '报表中心',
    icon: ExternalReportIcon,
    children: [
      { key: 'daily-report', label: '日报汇总', icon: 'calendar-check' },
      { key: 'monthly-report', label: '月报分析', icon: 'bar-chart-grouped' }
    ]
  }
]

const state = reactive({
  mode: 'vertical' as NavMenuMode,
  hidden: false,
  collapsed: false,
  appendToBody: false,
  activeKey: 'dashboard',
  textColor: '#334e68',
  activeTextColor: '#ffffff',
  submenuActiveTextColor: '#ffffff',
  activeBgColor: '#0e7490',
  scrollable: false,
  maxHeight: 300,
  accordion: false,
  fontSize: 14,
  fontWeight: 400,
  activeFontWeight: 600,
  fontFamily: 'var(--x-font-family)',
  itemGap: 4 as number | string,
  itemRadius: 10,
  submenuItemRadius: 7,
  showSubmenuArrow: true,
  submenuArrowIcon: ''
})

function handleSelect(key: string) {
  state.activeKey = key
}
</script>

<template>
  <Story title="导航组件/菜单 NavMenu" group="components">
    <Variant title="外观接口">
      <div class="menu-playground">
        <div class="menu-controls">
          <label>
            <span>菜单模式</span>
            <select v-model="state.mode">
              <option value="vertical">纵向菜单</option>
              <option value="horizontal">横向菜单</option>
            </select>
          </label>

          <label class="menu-check">
            <input v-model="state.hidden" type="checkbox" />
            <span>隐藏侧边栏</span>
          </label>

          <label class="menu-check">
            <input v-model="state.collapsed" type="checkbox" />
            <span>收起纵向菜单</span>
          </label>

          <label class="menu-check">
            <input v-model="state.appendToBody" type="checkbox" />
            <span>挂载到 body</span>
          </label>

          <label class="menu-check">
            <input v-model="state.scrollable" type="checkbox" />
            <span>菜单内部滚动</span>
          </label>

          <label>
            <span>最大高度</span>
            <input v-model.number="state.maxHeight" type="number" min="120" max="520" />
          </label>

          <label class="menu-check">
            <input v-model="state.accordion" type="checkbox" />
            <span>同级仅展开一个</span>
          </label>

          <span class="menu-active">当前选中：{{ state.activeKey }}</span>
          <label>
            <span>默认文字色</span>
            <input v-model="state.textColor" type="color" />
          </label>
          <label>
            <span>激活文字色</span>
            <input v-model="state.activeTextColor" type="color" />
          </label>
          <label>
            <span>弹层激活文字色</span>
            <input v-model="state.submenuActiveTextColor" type="color" />
          </label>
          <label>
            <span>激活背景色</span>
            <input v-model="state.activeBgColor" type="color" />
          </label>
          <label>
            <span>字号</span>
            <input v-model.number="state.fontSize" type="number" min="11" max="24" />
          </label>
          <label>
            <span>默认字重</span>
            <input v-model.number="state.fontWeight" type="number" min="100" max="900" step="100" />
          </label>
          <label>
            <span>激活字重</span>
            <input v-model.number="state.activeFontWeight" type="number" min="100" max="900" step="100" />
          </label>
          <label>
            <span>字体族</span>
            <input v-model="state.fontFamily" type="text" />
          </label>
          <label>
            <span>菜单项间距</span>
            <input v-model="state.itemGap" type="text" placeholder="4 / 0.75rem" />
          </label>
          <label>
            <span>菜单项圆角</span>
            <input v-model.number="state.itemRadius" type="number" min="0" max="32" />
          </label>
          <label>
            <span>子菜单项圆角</span>
            <input v-model.number="state.submenuItemRadius" type="number" min="0" max="32" />
          </label>
          <label class="menu-check">
            <input v-model="state.showSubmenuArrow" type="checkbox" />
            <span>显示子菜单箭头</span>
          </label>
          <label>
            <span>子菜单箭头图标</span>
            <input v-model="state.submenuArrowIcon" type="text" placeholder="ri-arrow-right-s-line" />
          </label>
        </div>

        <div class="menu-preview" :class="[`menu-preview--${state.mode}`, { 'is-collapsed': state.collapsed }]">
          <XNavMenu
            :items="navItems"
            :active-key="state.activeKey"
            :mode="state.mode"
            :hidden="state.hidden"
            :collapsed="state.collapsed"
            :append-to-body="state.appendToBody"
            :allow-collapse="true"
            :scrollable="state.scrollable"
            :max-height="state.maxHeight"
            :accordion="state.accordion"
            :text-color="state.textColor"
            :active-text-color="state.activeTextColor"
            :submenu-active-text-color="state.submenuActiveTextColor"
            :active-bg-color="state.activeBgColor"
            :font-size="state.fontSize"
            :font-weight="state.fontWeight"
            :active-font-weight="state.activeFontWeight"
            :font-family="state.fontFamily"
            :item-gap="state.itemGap"
            :item-radius="state.itemRadius"
            :submenu-item-radius="state.submenuItemRadius"
            :show-submenu-arrow="state.showSubmenuArrow"
            :submenu-arrow-icon="state.submenuArrowIcon || undefined"
            @select="handleSelect"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.menu-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: visible;
}

.menu-controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 14px 16px;
}

.menu-controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 8px;
}

.menu-controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  padding: 0 10px;
}

.menu-controls input[type="number"],
.menu-controls input[type="text"] {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  padding: 0 10px;
}

.menu-controls input[type="number"] {
  width: 72px;
}

.menu-controls input[type="text"] {
  width: 180px;
}

.menu-controls input[type="color"] {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  height: 34px;
  padding: 2px;
  width: 44px;
}

.menu-active {
  color: #334e68;
  font-size: 13px;
}

.menu-preview {
  background: #f8fafc;
  min-height: 220px;
  padding: 16px;
}

.menu-preview--vertical {
  max-width: 280px;
}

.menu-preview--vertical.is-collapsed {
  max-width: 72px;
}
</style>
