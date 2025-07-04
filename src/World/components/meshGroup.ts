import {
  BoxGeometry,
  ConeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'

function createMeshGroup() {
  const group = new Group()

  const sphereGeometry = new SphereGeometry(0.25, 16, 16)
  const boxGeometry = new BoxGeometry(0.25, 0.25, 0.25)
  const coneGeometry = new ConeGeometry(0.25, 0.5, 16)
  const material = new MeshStandardMaterial({
    color: 'indigo',
  })

  const protoSphere = new Mesh(sphereGeometry, material)
  const protoBox = new Mesh(boxGeometry, material)
  const protoCone = new Mesh(coneGeometry, material)
  const protoList = [protoSphere, protoBox, protoCone]

  group.add(protoSphere)

  // 创建 20 个克隆球体，并添加到组中
  const count = 20
  const step = 1 / count
  for (let i = 0; i < 1; i += step) {
    const sphere = protoList[Math.round(i / step) % 3].clone()

    sphere.position.x = Math.cos(2 * Math.PI * i)
    sphere.position.y = Math.sin(2 * Math.PI * i)
    sphere.position.z = -i * 5

    sphere.scale.multiplyScalar(0.01 + i)

    group.add(sphere)
  }

  group.scale.setScalar(2)

  const radiansPerSecond = MathUtils.degToRad(30)

  group.tick = (delta: number) => {
    group.rotation.z -= delta * radiansPerSecond
  }

  return group
}

export { createMeshGroup }
