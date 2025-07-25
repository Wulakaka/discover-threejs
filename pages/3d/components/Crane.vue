<script setup lang="ts">
import modelSrc from '@/assets/models/Flamingo.glb?url'
import type { Object3D } from 'three'

const modelRef = shallowRef<Object3D>()

// watch(modelRef, (model) => {
//   // Do something with the model
//   model?.position.set(0, 0, 0)
// })
</script>

<template>
  <Suspense>
    <GLTFModel
      ref="modelRef"
      :path="modelSrc"
      draco
      decoder-path="/draco/"
      cast-shadow
      receive-shadow
    />
  </Suspense>
</template>

<style scoped></style>
