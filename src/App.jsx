import { useState } from 'react'
import { profile } from './data/profile.js'

const email = 'ru91patil@gmail.com'

function HeroArtwork() {
  const [paused, setPaused] = useState(false)
  return (
    <figure className="hero-art">
      <picture>
        {!paused && <source media="(prefers-reduced-motion: no-preference)" srcSet="/impact-animation.gif" />}
        <img src="/impact-still.png" alt="A woman at her laptop looking out at a spiral galaxy." width="413" height="231" fetchPriority="high" />
      </picture>
      <button className="motion-control" type="button" onClick={() => setPaused(!paused)}>
        {paused ? 'Play animation' : 'Pause animation'}
      </button>
    </figure>
  )
}

function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-name">{profile.name}</p>
          <p className="identity">Software Engineer · Curious Thinker · Builder</p>
          <h1 id="hero-title">Curiosity.<br />Clarity.<br /><em>Purpose.</em></h1>
          <p className="hero-intro">Driven to understand complex problems, engineer thoughtful solutions, and build technology that improves human lives.</p>
          <div className="actions">
            <a className="button" href="#contact">Let’s collaborate</a>
            <a className="text-link" href={profile.resume} download>Download résumé</a>
          </div>
        </div>
        <HeroArtwork />
      </section>
      <section id="journey" className="journey" aria-labelledby="journey-title">
        <h2 id="journey-title">Where I am.<br /><em>Where I’m headed.</em></h2>
        <div className="journey-copy">
          <p>I’m an experienced software engineer. For 8+ years, I’ve built full-stack products and large-scale distributed systems, working across React, TypeScript, Java, Kotlin, GraphQL, and Kafka.</p>
          <p>I’m looking for meaningful problems in healthcare, mental health, ADHD, neuroscience, and scientific research. If you know a problem firsthand, I’d love to hear what takes too much time or what tool you wish existed.</p>
        </div>
      </section>
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Let’s build something useful.</h2>
          <p>I’m also open to conversations about building an intellectually fulfilling, sustainable career.</p>
          <div className="actions">
            <a className="button" href={`mailto:${email}`}>Email me</a>
            <a className="text-link" href={profile.github}>GitHub</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default function App({ pathname = window.location.pathname }) {
  const isHome = pathname === '/'
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell">
        <a className="brand" href="/">{profile.name}</a>
        <nav aria-label="Main navigation">
          <a href="/#journey">Journey</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>
      <main id="main" className="shell" tabIndex={-1}>
        {isHome ? <Home /> : <section className="missing"><h1>Page not found</h1><a href="/">Back to the homepage</a></section>}
      </main>
      <footer className="site-footer shell"><span>{profile.name}</span><a href={profile.resume} download>Résumé</a></footer>
    </>
  )
}
