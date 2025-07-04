import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  SpotLight,
} from 'three'

function createLights() {
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    3 // intensity
  )

  ambientLight.intensity = 0

  // ambientLight.position.y = 0.1

  const mainLight = new SpotLight('white', 10)
  // mainLight.target.position.set(0, 0, -10)
  // mainLight.visible = false

  // const mainLightHelper = new DirectionalLightHelper(mainLight, 1)

  return { mainLight, ambientLight }
}

export { createLights }
