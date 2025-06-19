import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createLights } from './components/lights'
import { createScene } from './components/scene'
import { createRenderer } from './systems/renderer'
import { Resizer } from './systems/Resizer'
import { Loop } from './systems/Loop'

class World {
  private camera = createCamera()
  private scene = createScene()
  private renderer = createRenderer()
  private loop = new Loop(this.camera, this.scene, this.renderer)
  constructor(container: HTMLDivElement) {
    container.append(this.renderer.domElement)

    const cube = createCube()
    const light = createLights()

    this.loop.updatables.push(cube)
    this.loop.updatables.push(this.camera)
    // this.loop.updatables.push(light)

    this.scene.add(cube, light)

    const resizer = new Resizer(container, this.camera, this.renderer)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { World }
