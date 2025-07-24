<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

definePageMeta({
  layout: 'plain',
})
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <TresMesh>
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[2, 2, 2]" />
  </TresCanvas>
</template>
