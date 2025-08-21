<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import StackingSurface from './StackingSurface.vue'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 70, 0]" />
    <OrbitControls />
    <TresGroup :position="[-60, 0, -20]">
      <StackingSurface />
    </TresGroup>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="5" />
  </TresCanvas>
</template>
