<script setup lang="ts">
import { ref } from 'vue'
const buttonMode = ref('day')
import { XBrick, XText, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap>
    <XRadioButton v-model="buttonMode" name="city-button" value="new-york">New York</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="washington">Washington</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="los-angeles">Los Angeles</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="chicago">Chicago</XRadioButton>
  </XBrick>
  <XText tag="p" variant="muted">当前值：{{ buttonMode }}</XText>
</template>
