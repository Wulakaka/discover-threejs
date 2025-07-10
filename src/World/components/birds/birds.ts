import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import modelParrot from 'assets/models/Parrot.glb?url'
import modelFlamingo from 'assets/models/Flamingo.glb?url'
import modelStork from 'assets/models/Stork.glb?url'
import { setupModel } from './setupModel'

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
