import '@/styles/main.css'
import { World } from './World/World'

function main() {
  // Get a reference to the container element
  const container = <HTMLDivElement>document.querySelector('#scene-container')

  // create a new world
  const world = new World(container)

  // start the animation loop
  world.start()
}

main()
