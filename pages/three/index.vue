<script setup lang="ts">
import { World } from './models/World/World'

definePageMeta({
  layout: 'plain',
})

const container = useTemplateRef<HTMLDivElement>('scene-container')

onMounted(() => {
  if (!container.value) {
    console.error('Container element not found')
    return
  }

  main(container.value).catch((error) => {
    console.error(error)
  })
})

async function main(container: HTMLDivElement) {
  // create a new world
  const world = new World(container)

  await world.init()

  // start the animation loop
  world.start()
}
</script>

<template>
  <div ref="scene-container" class="absolute w-full h-full bg-[skyblue]" />
</template>

<style lang="scss" scoped></style>
