<script setup lang="ts">
import { BoxGeometry, MeshStandardMaterial } from 'three'
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'
import type { MapSize } from '~/types/PointMap'

const { mapSize } = defineProps<{
  mapSize: MapSize
}>()

const { length, width } = mapSize

const material = new MeshStandardMaterial({
  color: '#8B4513', // Brown color for the ground
  roughness: 0.5,
})

const geometry = new BoxGeometry(length, 10, width)

const brushBase = new Brush(geometry, material)
brushBase.position.set(0, -5, 0)
brushBase.updateMatrixWorld()

const binGeometry = new BoxGeometry(2, 2, 2)

let result = brushBase
for (let i = 0; i < 10; i++) {
  const x = Math.random() * length - length / 2
  const z = Math.random() * width - width / 2
  const brush = new Brush(binGeometry, material)
  brush.position.set(x, -1, z)
  brush.updateMatrixWorld()
  const evaluator = new Evaluator()
  result = evaluator.evaluate(result, brush, SUBTRACTION)
}
</script>

<template>
  <primitive :object="result" />
</template>

<style scoped></style>
