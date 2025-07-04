<script setup lang="ts">
import { World } from '~/src/World/World'

definePageMeta({
  layout: 'plain',
})

const container = useTemplateRef<HTMLDivElement>('scene-container')

onMounted(() => {
  if (!container.value) {
    console.error('Container element not found')
    return
  }
  // create a new world
  const world = new World(container.value)

  // start the animation loop
  world.start()
})
</script>

<template>
  <div ref="scene-container" class="absolute w-full h-full bg-[skyblue]" />
</template>

<style lang="scss" scoped></style>
