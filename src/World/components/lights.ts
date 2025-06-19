import { DirectionalLight } from 'three'

function createLights() {
  // create a directional light
  const light = new DirectionalLight('white', 8)

  // move the light right, up, and towards us
  light.position.set(10, 10, 10)

  const radiansPerSecond = Math.PI / 2 // 90 degrees per second

  let theta = 0

  const r = 5

  light.tick = (delta: number) => {
    theta += radiansPerSecond * delta
    // make the light move in a circle around the origin
    light.position.x = r * Math.cos(theta)
    light.position.z = r * Math.sin(theta)
  }

  return light
}

export { createLights }
