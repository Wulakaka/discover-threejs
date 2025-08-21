import * as THREE from 'three'

export function getSurfaceMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.08, 0.08, 0.08),
    wireframe: false,
    // depthWrite: false,
    // transparent: true,
  })

  // 通过对象应用更新 uniforms
  const customUniforms = {
    uMinHeight: { value: -2.0 },
    // 动画
    uPhase: { value: 0.0 },
    uIntersection: { value: new THREE.Vector3(9999, 9999, 9999) },
    uLineColor: { value: new THREE.Color('white') },
  }

  // gui?.add(customUniforms.uIntersection.value, 'y', -1, 10, 0.1).name('点Y坐标')
  // gui?.addColor(customUniforms.uLineColor, 'value').name('线颜色')

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uMinHeight = customUniforms.uMinHeight
    shader.uniforms.uPhase = customUniforms.uPhase
    shader.uniforms.uIntersection = customUniforms.uIntersection
    shader.uniforms.uLineColor = customUniforms.uLineColor

    shader.vertexShader = `
    varying float vHeight;

    varying vec3 vPosition;

    // varying vec3 vNormal;

    uniform float uMinHeight;

    uniform float uPhase;

    ${shader.vertexShader}
  `.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>

    // transformed.y = uMinHeight + uPhase * (transformed.y - uMinHeight);

    vPosition = position;`,
    )

    shader.fragmentShader = `
    varying vec3 vPosition;

    uniform vec3 uIntersection;

    uniform vec3 uLineColor;

    // varying vec3 vNormal;
    
    uniform float uMinHeight;
    ${shader.fragmentShader}
  `.replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>

    float dis = 0.05;

    float drawLineX = smoothstep(0.0, dis, abs(vPosition.x - uIntersection.x));

    float drawLineY = smoothstep(0.0, dis, abs(vPosition.y - uIntersection.y));

    float drawLineZ = smoothstep(0.0, dis, abs(vPosition.z - uIntersection.z));

    vec3 lineColor = uLineColor;

    gl_FragColor.rgb = mix(lineColor, gl_FragColor.rgb, drawLineX);

    gl_FragColor.rgb = mix(lineColor, gl_FragColor.rgb, drawLineZ);

    // if(vPosition.y > uIntersection.y) {

    //   gl_FragColor.a = 0.0;
    
    // }`,
    )
  }

  return {
    material,
    customUniforms,
  }
}
