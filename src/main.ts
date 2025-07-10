import { World } from './World/World'

export async function main(container: HTMLDivElement) {
  // create a new world
  const world = new World(container)

  await world.init()

  // start the animation loop
  world.start()
}
