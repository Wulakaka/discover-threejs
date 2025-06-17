import { createCamera } from './components/camera'
import { createCube } from './components/cube'
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
    this.scene.add(cube)

    const resizer = new Resizer(container, this.camera, this.renderer)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

export { World }
