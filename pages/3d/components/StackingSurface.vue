<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import * as d3 from 'd3'

import { getSurfaceMaterial } from '../utils/getSurfaceMaterial'

import { data } from '../utils/surfaceData'

interface ResponseData {
  xrealValues: number[]
  yrealValues: number[]
  data: number[][]
}

const positionInWorld = (x: number, y: number, z: number) => [x, z, y]

// 创建几何体
const geometry = new THREE.BufferGeometry()

const { material, customUniforms } = getSurfaceMaterial()

// 创建网格
const mesh = new THREE.Mesh(geometry, material)
mesh.receiveShadow = true

function updateGeometry(
  { data, xrealValues, yrealValues }: ResponseData,
  geometry: THREE.BufferGeometry
) {
  const topPoints: THREE.Vector3[] = []
  const originalData: { x: number; y: number; z: number }[] = []
  const minZ = Math.min(...data.map((i) => Math.min(...i)))
  customUniforms.uMinHeight.value = minZ

  // 收集顶面点数据
  for (let i = 0; i < yrealValues.length; i++) {
    for (let j = 0; j < xrealValues.length; j++) {
      const x = xrealValues[j]
      const y = yrealValues[i]
      const z = data?.[i]?.[j] ?? minZ - 0.01

      originalData.push({ x, y, z })
      topPoints.push(new THREE.Vector3(...positionInWorld(x, y, z)))
    }
  }
  if (topPoints.length < 3) return

  // 顶面三角剖分
  const topPointsFlat: [number, number][] = topPoints.map((p) => [p.x, p.z])
  const delaunay = d3.Delaunay.from(topPointsFlat)
  const topTriangles = Array.from(delaunay.triangles)

  // 顶面索引
  const allVertices: THREE.Vector3[] = [...topPoints]
  const allIndices: number[] = []
  for (let i = 0; i < topTriangles.length; i += 3) {
    allIndices.push(topTriangles[i], topTriangles[i + 1], topTriangles[i + 2])
  }

  // 获取边界点索引（凸包）
  const boundaryIndices = delaunay.hull

  // 创建底面顶点（只保留边界点）
  const bottomHeight = minZ - 0.02
  const bottomStartIndex = allVertices.length
  for (const idx of boundaryIndices) {
    const { x, y } = originalData[idx]
    const [worldX, , worldZ] = positionInWorld(x, y, bottomHeight)
    allVertices.push(new THREE.Vector3(worldX, bottomHeight, worldZ))
  }

  // 底面三角剖分（基于边界点，逆时针）
  if (boundaryIndices.length >= 3) {
    for (let i = boundaryIndices.length - 1; i >= 2; i--) {
      allIndices.push(
        bottomStartIndex + i - 1,
        bottomStartIndex,
        bottomStartIndex + i
      )
    }
  }

  // 侧面（连接边界点的顶面和底面）
  for (let i = 0; i < boundaryIndices.length; i++) {
    const topIdx = boundaryIndices[i]
    const nextTopIdx = boundaryIndices[(i + 1) % boundaryIndices.length]
    const bottomIdx = bottomStartIndex + i
    const nextBottomIdx = bottomStartIndex + ((i + 1) % boundaryIndices.length)

    allIndices.push(
      topIdx,
      bottomIdx,
      nextTopIdx,
      nextTopIdx,
      bottomIdx,
      nextBottomIdx
    )
  }

  geometry.setFromPoints(allVertices)
  geometry.setIndex(allIndices)
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
}

updateGeometry(data.data, geometry)

onBeforeUnmount(() => {
  if (mesh) {
    mesh.geometry.dispose()
    mesh.material.dispose()
  }
})

function onPointerEnter(intersection: THREE.Intersection) {
  // intersection.point 是世界坐标
  const worldPoint = intersection.point.clone()

  // 转换为 mesh 的本地坐标
  const localPoint = mesh.worldToLocal(worldPoint.clone())

  customUniforms.uIntersection.value.copy(localPoint)
}

function onPointerLeave() {
  customUniforms.uIntersection.value.set(9999, 9999, 9999) // 重置到一个不可能的值
}
</script>

<template>
  <primitive
    :object="mesh"
    @pointer-enter="onPointerEnter"
    @pointer-leave="onPointerLeave"
  />
</template>

<style scoped></style>
