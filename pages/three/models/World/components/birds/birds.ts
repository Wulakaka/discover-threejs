import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import modelParrot from 'assets/models/Parrot.glb?url'
import modelFlamingo from 'assets/models/Flamingo.glb?url'
import modelStork from 'assets/models/Stork.glb?url'
import { setupModel } from './setupModel'
import { BufferAttribute, Color } from 'three'

async function loadBirds() {
  const loader = new GLTFLoader()

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync(modelParrot),
    loader.loadAsync(modelFlamingo),
    loader.loadAsync(modelStork),
  ])

  // console.log('Squaaawk!', parrotData)

  const parrot = setupModel(parrotData)
  parrot.scale.setScalar(0.01)
  parrot.position.set(0, 0, 2.5)

  // 清除每个顶点的颜色信息
  const colorAttribute = parrot.geometry.getAttribute('color')
  const whiteColor = new Float32Array(colorAttribute.array.length).fill(1.0)
  parrot.geometry.attributes.color = new BufferAttribute(whiteColor, 3)

  // 设置材质颜色
  parrot.material.color = new Color('white')

  const hPerSecond = 0.5
  let h = 0
  parrot.tick = (delta) => {
    h += hPerSecond * delta
    h = h > 1 ? h - 1 : h
    parrot.material.color.setHSL(h, 0.8, 0.5)
    parrot.material.needsUpdate = true
  }

  const flamingo = setupModel(flamingoData)
  flamingo.scale.setScalar(0.01)
  flamingo.position.set(7.5, 0, -10)

  const stork = setupModel(storkData)
  stork.scale.setScalar(0.01)
  stork.position.set(0, -2.5, -10)

  return {
    parrot,
    flamingo,
    stork,
  }
}

export { loadBirds }
