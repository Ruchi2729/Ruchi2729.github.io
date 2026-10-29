import { motion, useTransform } from 'motion/react'
import { scenes } from './animationSequence.js'

const stops = [0, 1, 2, 3]

function looseHairPath(x, y) {
  return `M${x - 19} ${y - 5}
    C${x - 19} ${y - 25} ${x + 15} ${y - 27} ${x + 20} ${y - 6}
    C${x + 25} ${y + 3} ${x + 18} ${y + 9} ${x + 22} ${y + 16}
    C${x + 29} ${y + 24} ${x + 21} ${y + 29} ${x + 25} ${y + 35}
    Q${x + 29} ${y + 40} ${x + 19} ${y + 39}
    C${x + 10} ${y + 36} ${x + 18} ${y + 28} ${x + 13} ${y + 22}
    C${x + 8} ${y + 16} ${x + 14} ${y + 7} ${x + 10} ${y - 3}
    Q${x + 2} ${y - 15} ${x - 11} ${y - 3}
    C${x - 16} ${y + 6} ${x - 10} ${y + 13} ${x - 15} ${y + 20}
    C${x - 21} ${y + 27} ${x - 13} ${y + 33} ${x - 20} ${y + 38}
    Q${x - 27} ${y + 42} ${x - 26} ${y + 35}
    C${x - 29} ${y + 28} ${x - 20} ${y + 23} ${x - 24} ${y + 15}
    C${x - 28} ${y + 7} ${x - 20} ${y + 3} ${x - 19} ${y - 5} Z`
}

function Limb({ progress, values, width, reducedMotion }) {
  const points = useTransform(progress, stops, values)
  return <motion.polyline points={reducedMotion ? values[3] : points} fill="none" strokeWidth={width} />
}

export default function Silhouette({ progress, reducedMotion }) {
  const x = useTransform(progress, stops, scenes.map(scene => scene.head[0]))
  const y = useTransform(progress, stops, scenes.map(scene => scene.head[1]))
  const hair = useTransform([x, y], ([cx, cy]) => looseHairPath(cx, cy))
  const neck = useTransform([x, y], ([cx, cy]) => `M${cx} ${cy + 12}v20`)
  const final = scenes[3].head
  return <g fill="var(--ink)" stroke="var(--ink)" strokeLinecap="round" strokeLinejoin="round">
    <motion.path d={reducedMotion ? looseHairPath(...final) : hair} stroke="none" />
    <motion.circle cx={reducedMotion ? final[0] : x} cy={reducedMotion ? final[1] : y} r="16" stroke="none" />
    <motion.path d={reducedMotion ? `M${final[0]} ${final[1] + 12}v20` : neck} strokeWidth="11" />
    <Limb progress={progress} reducedMotion={reducedMotion} values={scenes.map(scene => scene.torso)} width={27} />
    {[0, 1].map(index => <Limb key={`arm-${index}`} progress={progress} reducedMotion={reducedMotion} values={scenes.map(scene => scene.arms[index])} width={11} />)}
    {[0, 1].map(index => <Limb key={`leg-${index}`} progress={progress} reducedMotion={reducedMotion} values={scenes.map(scene => scene.legs[index])} width={14} />)}
  </g>
}
