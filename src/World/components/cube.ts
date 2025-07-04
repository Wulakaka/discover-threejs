import {
  BoxGeometry,
  Euler,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from 'three'
import img from '~/assets/textures/uv-test-bw.png'

function createMaterial() {
  // create a texture loader
  const textureLoader = new TextureLoader()

  // load a texture
  const texture = textureLoader.load(img)

  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  // texture.center.set(0.2, 0.2)

  // texture.rotation = Math.PI / 4

  // create a "standard" material
  const material = new MeshStandardMaterial({
    map: texture,
    // displacementMap: texture,
    transparent: true,
    // color: 'purple',
  })

  return material
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = createMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(0, -0.5, 0)

  const radiansPerSecond = MathUtils.degToRad(30)

  let x = 0

  cube.tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta

    x += 1 * delta
    x = x % 10
    cube.position.x = x - 5
  }

  return cube
}

export { createCube }
