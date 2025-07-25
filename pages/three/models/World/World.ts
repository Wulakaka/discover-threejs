import { loadBirds } from './components/birds/birds'
import { createCamera } from './components/camera'
import { createAxesHelper, createGridHelper } from './components/helpers'
// import { createMeshGroup } from './components/meshGroup'
import { createLights } from './components/lights'
import { createScene } from './components/scene'
import { Train } from './components/Train/Train'

import { createControls } from './systems/control'
import { createRenderer } from './systems/renderer'
import { Resizer } from './systems/Resizer'
import { Loop } from './systems/Loop'

class World {
  private camera = createCamera()
  private scene = createScene()
  private renderer = createRenderer()
  private loop = new Loop(this.camera, this.scene, this.renderer)
  private controls = createControls(this.camera, this.renderer.domElement)
  constructor(container: HTMLDivElement) {
    container.append(this.renderer.domElement)

    // const meshGroup = createMeshGroup()
    const { ambientLight, mainLight } = createLights()
    // const train = new Train()

    this.loop.updatables.push(this.controls)

    this.scene.add(ambientLight, mainLight)

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

    // this.scene.add(createAxesHelper(), createGridHelper())
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()
    this.scene.add(parrot, flamingo, stork)

    this.loop.updatables.push(parrot, flamingo, stork)
    // this.controls.target.copy(parrot.position)
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
