import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  SpotLight,
} from 'three'

function createLights() {
  const ambientLight = new HemisphereLight('white', 'darkslategray', 30)

  // ambientLight.intensity = 0

  // ambientLight.position.y = 0.1

  const mainLight = new DirectionalLight('white', 10)
  mainLight.position.set(10, 10, 10)
  // mainLight.visible = false

  // const mainLightHelper = new DirectionalLightHelper(mainLight, 1)

  return { mainLight, ambientLight }
}

export { createLights }
