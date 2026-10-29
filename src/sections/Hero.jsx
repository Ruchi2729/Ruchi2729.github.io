import SignatureAnimation from '../components/SignatureAnimation/SignatureAnimation.jsx'
import { profile } from '../data/profile.js'

export default function Hero() {
  return <section id="home" className="shell hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow hero-identity">{profile.name} · {profile.role}</p>
      <h1 id="hero-title">{profile.introduction.headline}</h1>
      <p className="hero-specialties">{profile.introduction.specialties}</p>
      <p className="hero-description">{profile.introduction.description}</p>
      <p className="hero-tagline">{profile.introduction.tagline}</p>
      <a className="button" href="#work">Explore work <span aria-hidden="true">↗</span></a>
    </div>
    <SignatureAnimation />
    <div className="hero-foot"><span>{profile.experience} building software</span><span>Full stack engineering / AI / Human impact</span></div>
  </section>
}
