import { Clock } from 'three'
import type { Camera, Scene, WebGLRenderer } from 'three'

const clock = new Clock()

class Loop {
  camera: Camera
  scene: Scene
  renderer: WebGLRenderer
  updatables: (object & { tick: (delta: number) => void })[]
  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick()

      // render a frame
      this.renderer.render(this.scene, this.camera)
    })
  }
  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    // only call the getDelta function once per frame
    const delta = clock.getDelta()

    for (const object of this.updatables) {
      object.tick(delta)
    }
  }
}

export { Loop }
