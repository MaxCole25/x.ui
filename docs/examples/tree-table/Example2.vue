<script setup lang="ts">
const columns = [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
]
const rows = [
  {
    id: 'system',
    label: '用户权限',
    path: '/system/user-permission',
    children: [
      { id: 'users', label: '用户管理', path: '/system/user-permission/users' },
      { id: 'roles', label: '角色管理', path: '/system/user-permission/roles' }
    ]
  }
]
import { XTreeTable } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTreeTable :data="rows" :columns="columns" default-expand-all />
</template>
