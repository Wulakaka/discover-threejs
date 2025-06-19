import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  )

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10)

  const lengthPerSecond = 1

  let z = 0

  camera.tick = (delta: number) => {
    z += lengthPerSecond * delta
    camera.position.z = Math.abs((z % 20) - 10) + 10
  }

  return camera
}

export { createCamera }
