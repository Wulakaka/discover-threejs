import '@/styles/main.css'
import { World } from './World/World'

function main() {
  // Get a reference to the container element
  const container = <HTMLDivElement>document.querySelector('#scene-container')

  // 1. Create an instance of the world app
  const world = new World(container)

  // 2. Render the scene
  world.render()
}

main()
