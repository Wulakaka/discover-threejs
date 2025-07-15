import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { PerspectiveCamera } from 'three'

function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas)

  controls.enableDamping = true

  controls.tick = () => controls.update()

  return controls
}

export { createControls }
