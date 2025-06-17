import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createLights } from './components/lights'
import { createScene } from './components/scene'
import { createRenderer } from './systems/Renderer'
import { Resizer } from './systems/Resizer'

class World {
  private camera = createCamera()
  private scene = createScene()
  private renderer = createRenderer()
  constructor(container: HTMLDivElement) {
    container.append(this.renderer.domElement)

    const cube = createCube()
    const light = createLights()

    this.scene.add(cube, light)

    const resizer = new Resizer(container, this.camera, this.renderer)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

export { World }
