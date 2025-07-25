<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import Ground from './Ground.vue'
import type { MapSize } from '~/types/PointMap'

const mapSize: MapSize = {
  length: 200,
  width: 24,
  height: 20,
}
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 70, 0]" />
    <OrbitControls />
    <TresGroup>
      <Ground :map-size="mapSize" />
    </TresGroup>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="5" />
  </TresCanvas>
</template>
