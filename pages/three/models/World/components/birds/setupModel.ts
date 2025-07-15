import type { GLTF } from 'three/examples/jsm/Addons.js'

function setupModel(data: GLTF) {
  const model = data.scene.children[0]

  return model
}

export { setupModel }
