import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XTree } from '../src'

describe('XTree', () => {
  it('renders node labels', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A' }]
      }
    })
    expect(wrapper.text()).toContain('节点A')
  })
})
