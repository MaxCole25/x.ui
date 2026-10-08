import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach } from 'vitest'

// 断言失败也必须卸载实例，释放 Teleport、模态锁与事件监听。
enableAutoUnmount(afterEach)
