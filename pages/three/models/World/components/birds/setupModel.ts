import { AnimationClip, AnimationMixer, VectorKeyframeTrack } from 'three'
import type { GLTF } from 'three/examples/jsm/Addons.js'

function setupModel(data: GLTF) {
  const model = data.scene.children[0]
  const clip = data.animations[0]

  const mixer = new AnimationMixer(model)
  const action = mixer.clipAction(clip)
  // action.startAt(2).setEffectiveTimeScale(0.5).play().halt(10)
  action.play()

  // 创建动画轨迹，不同的属性需要使用不同的轨迹类
  const positionTrack = new VectorKeyframeTrack(
    '.position',
    [0, 1, 2],
    [0, 0, 0, 0, 5, 0, 0, 0, 4]
  )

  const scaleTrack = new VectorKeyframeTrack(
    '.scale',
    [0, 1, 3],
    [0.1, 0.1, 0.1, 1, 1, 1, 0.1, 0.1, 0.1].map((v) => v * 0.01)
  )
  // 创建新的动画剪辑
  const clipMove = new AnimationClip('move', -1, [positionTrack, scaleTrack])
  // turn it into an animated mesh by connecting it to a mixer
  // 通过连接到一个混合器将其转换为一个动画网格
  const mixerMove = new AnimationMixer(model)
  // 创建动画动作
  const actionMove = mixerMove.clipAction(clipMove)
  actionMove.play()

  model.tick = (delta: number) => {
    mixer.update(delta)
    mixerMove.update(delta)
  }

  return model
}

export { setupModel }
