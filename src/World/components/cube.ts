import {
  BoxGeometry,
  Euler,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three'

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({
    color: 'peachpuff',
  })

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

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
