import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true, // smooth edges
  })
  return renderer
}

export { createRenderer }
