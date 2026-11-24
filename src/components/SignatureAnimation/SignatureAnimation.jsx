import { useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import Silhouette from './Silhouette.jsx'
import { scenes } from './animationSequence.js'
import './signature.css'

function Sunrise() {
  return <g>
    <circle cx="312" cy="121" r="38" fill="#f4aa70" />
    <path d="M30 291 127 205 194 277 258 227 409 302V367H30Z" fill="#b77576" opacity=".52" />
    <path d="M18 334Q114 266 208 317T422 304V384H18Z" fill="#635079" opacity=".65" />
    <path d="M102 357h206" stroke="#ffd0a0" strokeWidth="7" strokeLinecap="round" />
  </g>
}

function CodeTrails() {
  return <g stroke="var(--sage)" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M102 357h194q52 0 52-53V169m-68 188q50 0 50-64V115m-76 242q49 0 49-43v-46" />
    <path d="m91 133-13 13 13 13m24-26 13 13-13 13m-13 4 5-34M292 192h33m-33 12h53" />
    <circle cx="348" cy="169" r="5" /><circle cx="330" cy="115" r="5" /><circle cx="303" cy="268" r="5" />
  </g>
}

function Workspace({ resolved }) {
  return <g stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M240 253h102m-89 0v102m75-102v102M171 226v55h61m-52 0v74" />
    <path d="m270 241-8-40h62l8 40Zm-9 3h77" fill="var(--paper)" />
    <g fill="var(--paper)">
      <rect x="83" y="67" width="71" height="48" rx="6" />
      <rect x="282" y="84" width="73" height="45" rx="6" />
      <rect x="170" y="38" width="68" height="43" rx="6" />
    </g>
    <path d="m154 90 17-31m67 0 44 43M119 115v42h41m159-28v41h-67" strokeDasharray={resolved ? undefined : '3 5'} />
    {resolved ? <g stroke="var(--ink)"><path d="m105 90 9 9 18-20m169 28 9 9 18-20m-144-37 9 9 18-20" /></g> : <g>
      <path d="m107 81-8 9 8 9m19-18 8 9-8 9m-12 4 5-26M296 98h28m-28 8h42m-42 8h21M184 51h39m-39 8h25m-25 8h32" />
    </g>}
  </g>
}

export default function SignatureAnimation() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [restart, setRestart] = useState(0)
  const container = useRef(null)
  const inView = useInView(container, { amount: 0.25 })
  const progress = useMotionValue(0)
  const landscapeOpacity = useTransform(progress, [0, 1, 2], [1, .24, 0])
  const codeOpacity = useTransform(progress, [0, 1, 2], [0, 1, 0])
  const deskOpacity = useTransform(progress, [0, 1.5, 2, 3], [0, 0, 1, 1])
  useMotionValueEvent(progress, 'change', value => setActive(Math.min(3, Math.floor(value + 0.05))))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !playing || !inView || progress.get() >= 3) return
    // One continuous timeline drives the character and scenery together.
    const playback = animate(progress, 3, {
      duration: (3 - progress.get()) * 3,
      ease: 'linear',
    })
    return () => playback.stop()
  }, [playing, inView, progress, restart])

  function selectScene(index) {
    setPlaying(false)
    progress.set(index)
  }

  function replay() {
    progress.set(0)
    setPlaying(true)
    setRestart(value => value + 1)
  }
  const titleId = useId()
  const captionId = useId()
  const displayIndex = active
  const scene = scenes[displayIndex]

  return <figure ref={container} className="signature">
    <svg viewBox="0 0 440 420" fill="none" role="img" aria-labelledby={titleId}>
      <title id={titleId}>{`${scene.label} — from a sunrise yoga practice to an engineering workspace`}</title>
      <rect width="440" height="420" rx="22" fill="var(--paper)" />
      <motion.g style={{ opacity: landscapeOpacity }}><Sunrise /></motion.g>
      <motion.g style={{ opacity: codeOpacity }}><CodeTrails /></motion.g>
      <path d="M55 358H386" stroke="var(--line)" />
      <Silhouette progress={progress} />
      <motion.g style={{ opacity: deskOpacity }}><Workspace resolved={displayIndex === 3} /></motion.g>
    </svg>
    <figcaption id={captionId} className="art-caption">{scene.caption}</figcaption>
    <div className="story-controls" role="group" aria-label="Illustration storyboard scenes">
      {scenes.map((item, index) => <button key={item.id} type="button" aria-pressed={displayIndex === index} onClick={() => selectScene(index)}>
        {item.label}
      </button>)}
    </div>
    <div className="playback-controls">
      <button type="button" disabled={active === 3} onClick={() => setPlaying(value => !value)}>{playing ? 'Pause animation' : 'Resume animation'}</button>
      <button type="button" onClick={replay}>Replay animation</button>
      <button type="button" disabled={active === 3} onClick={() => selectScene(3)}>Skip animation</button>
    </div>
  </figure>
}
