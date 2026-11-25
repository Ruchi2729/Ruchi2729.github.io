import { profile } from './data/profile.js'

const email = 'ru91patil@gmail.com'

function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src="/engineering-workspace.jpg" alt="A hologram of a systems diagram and a neural network rising from a notebook in a workspace at dusk." width="1440" height="810" fetchPriority="high" />
        <h1 id="hero-title" className="shell">Senior Software Engineer, Full Stack Engineer, Distributed Systems and Infra</h1>
      </section>
      <section id="journey" className="journey shell" aria-labelledby="journey-title">
        <h2 id="journey-title">Where I am.<br /><em>Where I’m headed.</em></h2>
        <div className="journey-copy">
          <p>I’m an experienced software engineer. For 8+ years, I’ve built full-stack products and large-scale distributed systems, working across React, TypeScript, Java, Kotlin, GraphQL, and Kafka.</p>
          <p>I’m looking for meaningful problems in healthcare, mental health, ADHD, neuroscience, and scientific research. If you know a problem firsthand, I’d love to hear what takes too much time or what tool you wish existed.</p>
        </div>
      </section>
      <section id="contact" className="contact shell" aria-labelledby="contact-title">
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
      <main id="main" tabIndex={-1}>
        {isHome ? <Home /> : <section className="missing shell"><h1>Page not found</h1><a href="/">Back to the homepage</a></section>}
      </main>
      <footer className="site-footer shell"><a href={profile.resume} download>Résumé</a></footer>
    </>
  )
}
