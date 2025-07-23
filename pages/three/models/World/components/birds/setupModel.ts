import { AnimationMixer } from 'three'
import type { GLTF } from 'three/examples/jsm/Addons.js'

function setupModel(data: GLTF) {
  const model = data.scene.children[0]
  const clip = data.animations[0]

  const mixer = new AnimationMixer(model)
  const action = mixer.clipAction(clip)
  action.play()

  model.tick = (delta: number) => mixer.update(delta)

  return model
}

export { setupModel }
