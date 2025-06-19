import type { PerspectiveCamera, WebGLRenderer } from 'three'

const setSize = (
  container: HTMLDivElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  // set the camera's aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight

  // update the camera's frustum
  camera.updateProjectionMatrix()

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight, false)

  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
class Resizer {
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
  ) {
    // set initial size
    setSize(container, camera, renderer)

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer)
      // perform any custom actions
      this.onResize()
    })
  }

  onResize() {}
}

export { Resizer }
