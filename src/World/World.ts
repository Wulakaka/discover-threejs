import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createLights } from './components/lights'
import { createScene } from './components/scene'

import { createControls } from './systems/control'
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

    const controls = createControls(this.camera, this.renderer.domElement)

    const cube = createCube()
    const { ambientLight, mainLight } = createLights()

    // this.loop.updatables.push(cube)
    // this.loop.updatables.push(this.camera)
    // this.loop.updatables.push(light)
    this.loop.updatables.push(controls)

    this.camera.add(mainLight)
    this.scene.add(cube, ambientLight, this.camera)

    // console.log(this.camera.target.position)
    // mainLight.target.position.copy(cube.position)

    const resizer = new Resizer(container, this.camera, this.renderer)

    // 按需渲染
    // controls.addEventListener('change', () => {
    //   this.render()
    // })
    // resizer.onResize = () => {
    //   this.render()
    // }
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
