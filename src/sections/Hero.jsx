import SignatureAnimation from '../components/SignatureAnimation/SignatureAnimation.jsx'
import { profile } from '../data/profile.js'

export default function Hero() {
  return <section id="home" className="shell hero" aria-labelledby="hero-title">
    <div>
      <p className="eyebrow">● Engineer by craft. Curious by nature.</p>
      <h1 id="hero-title">Driven by curiosity.<br />Building technology<br />for a <em>better life.</em></h1>
      <p className="hero-role">{profile.name}<br /><span>{profile.role}</span></p>
      <a className="button" href="#work">Explore work <span aria-hidden="true">↗</span></a>
    </div>
    <SignatureAnimation />
    <div className="hero-foot"><span>{profile.experience} building software</span><span>Full stack engineering / AI / Human impact</span></div>
  </section>
}
