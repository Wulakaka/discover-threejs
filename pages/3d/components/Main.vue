<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import StackingSurface from './StackingSurface.vue'

// import OrbitControls from './OrbitControls.vue'

const controlsRef = shallowRef()
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 70, 0]" :args="[45, 1, 0.1, 1000]" />
    <OrbitControls ref="controlsRef" />
    <TresGroup :position="[-60, 0, -20]">
      <StackingSurface :controls="controlsRef" />
    </TresGroup>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="5" />
  </TresCanvas>
</template>
