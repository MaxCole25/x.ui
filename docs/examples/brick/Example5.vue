<script setup lang="ts">
import { XBrick, XBrickItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" width="100%" :height="360" :gap="8" :padding="0">
    <XBrickItem :item-size="48" :padding="12" vertical-center background-color="#e0ecff">
      第一层：页面顶部
    </XBrickItem>

    <XBrickItem overflow="hidden">
      <XBrick direction="horizontal" width="100%" height="100%" :gap="8">
        <XBrickItem width="24%" :padding="12" background-color="#f0fdf4">
          第二层：左侧导航
        </XBrickItem>

        <XBrickItem overflow="hidden">
          <XBrick direction="vertical" width="100%" height="100%" :gap="8">
            <XBrickItem :item-size="64" :padding="12" vertical-center background-color="#fef3c7">
              第三层：工作区摘要
            </XBrickItem>

            <XBrickItem overflow="hidden">
              <XBrick direction="horizontal" width="100%" height="100%" :gap="8">
                <XBrickItem :padding="12" vertical-center horizontal-center background-color="#f1f5f9">
                  第四层：详情区域 A
                </XBrickItem>
                <XBrickItem :padding="12" vertical-center horizontal-center background-color="#ede9fe">
                  第四层：详情区域 B
                </XBrickItem>
              </XBrick>
            </XBrickItem>
          </XBrick>
        </XBrickItem>
      </XBrick>
    </XBrickItem>

    <XBrickItem :item-size="36" :padding="8" vertical-center background-color="#e0ecff">
      第一层：页面底部
    </XBrickItem>
  </XBrick>
</template>
