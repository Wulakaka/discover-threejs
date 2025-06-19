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

  // cube.rotation.order = 'YXZ' // set the order of rotation to YXZ
  cube.rotation.x = MathUtils.degToRad(40) // rotate 45 degrees around the x-axis
  cube.rotation.y = MathUtils.degToRad(30) // rotate 45 degrees around the y-axis

  cube.position.z = 6
  // cube.position.y = -1
  // cube.scale.setScalar(3) // scale the cube by 1.5 in all directions

  return cube
}

export { createCube }
