import Header from './components/Header.jsx'
import Hero from './sections/Hero.jsx'
import Projects from './sections/Projects.jsx'
import { profile } from './data/profile.js'

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <Hero />
      <section id="work" className="section shell" aria-labelledby="work-title">
        <p className="eyebrow">01 / Engineering practice</p>
        <div className="section-grid">
          <h2 id="work-title">Thoughtful systems.<br /><em>Practical impact.</em></h2>
          <div><p className="body-large">{profile.mission}</p><p className="muted">My focus spans full stack engineering, growth experiences, and AI product engineering.</p></div>
        </div>
      </section>
      <Projects />
      <section id="contact" className="section shell" aria-labelledby="contact-title">
        <p className="eyebrow">Let’s connect</p>
        <h2 id="contact-title">Good things begin<br />with a conversation.</h2>
        <a className="text-link" href={profile.github}>Find me on GitHub ↗</a>
      </section>
    </main>
    <footer className="shell footer"><span>{profile.name}</span><span>Built with care. Rooted in curiosity.</span></footer>
  </>
}
