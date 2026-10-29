import { useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react'
import Silhouette from './Silhouette.jsx'
import { scenes } from './animationSequence.js'
import './signature.css'

function Plant() {
  return <g stroke="var(--sage)" strokeWidth="2" fill="var(--sage)">
    <path d="M354 341v-65m0 34c-29 0-31-22-31-22 22 0 31 10 31 22Zm0-16c0-23 23-31 23-31 3 22-12 31-23 31Z" />
    <path d="m339 329 5 27h21l6-27Z" fill="var(--paper)" />
  </g>
}

function EverydayLife() {
  return <g>
    <g fill="var(--sage)" opacity=".5">
      <circle cx="93" cy="207" r="12" /><path d="M80 229q13-10 26 0l7 62H74Z" />
      <path d="M81 287h8v66h-8Zm17 0h8v66h-8Z" />
      <circle cx="128" cy="254" r="9" /><path d="M119 270h18l6 45h-30Z" /><path d="M119 310h6v43h-6Zm11 0h6v43h-6Z" />
    </g>
    <g stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="var(--ink)">
      <ellipse cx="299" cy="345" rx="18" ry="10" /><path d="m307 337 1-14 8 6 7-5v17Z" />
      <path d="M283 344q-21-5-15-23" fill="none" />
    </g>
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
  const reducedMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const lifeOpacity = useTransform(progress, [0, 0.7, 1, 1.5, 2, 3], [0, 0, 1, 1, 0, 0])
  const deskOpacity = useTransform(progress, [0, 1.5, 2, 3], [0, 0, 1, 1])
  useMotionValueEvent(progress, 'change', value => setActive(Math.min(3, Math.floor(value + 0.05))))

  useEffect(() => {
    if (reducedMotion) {
      progress.set(3)
      return
    }
    if (!playing || !inView || progress.get() >= 3) return
    // One continuous timeline drives the character and scenery together.
    const playback = animate(progress, 3, {
      duration: (3 - progress.get()) * 3,
      ease: 'linear',
    })
    return () => playback.stop()
  }, [playing, inView, reducedMotion, progress, restart])

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
  const displayIndex = reducedMotion ? 3 : active
  const scene = scenes[displayIndex]

  return <figure ref={container} className="hero-art signature">
    <svg viewBox="0 0 440 420" fill="none" role="img" aria-labelledby={`${titleId} ${captionId}`}>
      <title id={titleId}>{scene.label}: an illustrated day in the life of an engineer</title>
      <circle cx="220" cy="210" r="166" fill="var(--sage-soft)" />
      <circle cx="220" cy="210" r="190" fill="none" stroke="var(--line)" strokeDasharray="2 9" />
      <path d="M55 358H386" stroke="var(--line)" />
      <ellipse cx="221" cy="359" rx="125" ry="7" fill="var(--ink)" opacity=".05" />
      <motion.g style={{ opacity: lifeOpacity }}><EverydayLife /></motion.g>
      <Plant />
      <Silhouette progress={progress} reducedMotion={reducedMotion} />
      <motion.g style={{ opacity: deskOpacity }}><Workspace resolved={displayIndex === 3} /></motion.g>
    </svg>
    <figcaption id={captionId} className="art-caption" aria-live="polite">{scene.caption}</figcaption>
    <div className="story-controls" role="group" aria-label="Illustration storyboard scenes">
      {scenes.map((item, index) => <button key={item.id} type="button" aria-pressed={displayIndex === index} onClick={() => selectScene(index)}>
        <span className="scene-number" aria-hidden="true">0{index + 1}</span> {item.label}
      </button>)}
    </div>
    {!reducedMotion && <div className="playback-controls">
      <button type="button" disabled={active === 3} onClick={() => setPlaying(value => !value)}>{active === 3 ? 'Finished' : playing ? 'Pause animation' : 'Resume animation'}</button>
      <button type="button" onClick={replay}>Replay animation</button>
    </div>}
    <p className="story-note">{reducedMotion ? 'Still illustration · reduced motion enabled' : 'An illustrated day · plays once automatically'}</p>
  </figure>
}
