import { useEffect, useRef } from 'react'
import { Architecture, Scenario } from './components/Architecture.tsx'
import { profile } from './data/profile.js'
import { projects } from './data/projects.js'
import { articles, capabilities, caseEvidence, cases, lab, timeline } from './data/portfolio.js'
import { routes } from './routes.js'

const links = [['Experience', '/experience/'], ['Engineering Lab', '/lab/'], ['Writing', '/writing/'], ['Recruiter Hub', '/recruiters/']]

function ContactLinks() {
  return <div className="actions">
    <a className="button primary" href={profile.resume} download>Download résumé</a>
    <a className="button" href={profile.linkedin}>Connect on LinkedIn</a>
    <a className="button" href={profile.github}>GitHub</a>
  </div>
}

function Header({ path }) {
  const themeControl = useRef(null)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved === 'light' || saved === 'dark') {
        themeControl.current.value = saved
        document.documentElement.dataset.theme = saved
      }
    } catch { /* Private browsing can disable storage. */ }
  }, [])
  function changeTheme(event) {
    const theme = event.target.value
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* Private browsing can disable storage. */ }
  }
  return <header className="topbar">
    <div className="shell header-inner">
      <a href="/" className="brand"><span aria-hidden="true">RP</span>{profile.name}</a>
      <nav aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</a>)}
      </nav>
      <select aria-label="Color theme" ref={themeControl} defaultValue="system" onChange={changeTheme}>
        <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
      </select>
    </div>
  </header>
}

function Intro({ eyebrow, title, children }) {
  return <header className="intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</header>
}

function Cards({ items, prefix, heading: Heading = 'h2' }) {
  return <div className="cards">{items.map((item) => <article className="card" key={item.id}>
    <p className="eyebrow">{item.area || item.topic}{item.status && ` · ${item.status}`}</p>
    <Heading><a href={`/${prefix}/${item.id}/`}>{item.title}</a></Heading>
    <p>{item.description || item.problem}</p>
  </article>)}</div>
}

function Home() {
  return <>
    <div className="hero">
      <div>
        <p className="eyebrow">Senior Software Engineer at LinkedIn</p>
        <h1>Engineering scalable systems. <em>Building intelligent products.</em></h1>
        <p className="lead">I’m Ruchira Patil. I build full-stack products across distributed systems, growth, and applied AI. I own work from the member experience through the services and operational workflows behind it.</p>
        <div className="actions">
          <a className="button primary" href="/experience/">Explore experience</a>
          <a className="button" href="/lab/">View projects</a>
          <a className="button" href={profile.resume} download>Download résumé</a>
          <a className="button" href={profile.linkedin}>Connect</a>
        </div>
      </div>
      <aside aria-label="Career highlights" className="highlights">
        <div><strong>8+ years</strong><span>Software engineering experience</span></div>
        <div><strong>LinkedIn</strong><span>Growth and Notifications</span></div>
        <div><strong>Northeastern</strong><span>M.S. in Information Systems</span></div>
      </aside>
    </div>
    <section className="section"><div className="section-heading"><h2>Selected LinkedIn work</h2><a href="/experience/">All experience</a></div><Cards items={[cases[1], cases[3], cases[5]]} prefix="experience" heading="h3" /></section>
    <section className="section"><h2>Engineering capabilities</h2><div className="capabilities">
      {capabilities.map(([title, source, detail]) => <details key={title}><summary>{title}</summary><p className="eyebrow">{source}</p><p>{detail}</p></details>)}
    </div></section>
    <section className="section"><div className="section-heading"><h2>Engineering Lab</h2><a href="/lab/">Browse projects</a></div><Cards items={lab} prefix="lab" heading="h3" /></section>
  </>
}

function Experience({ item }) {
  if (!item) return <><Intro eyebrow="Professional experience" title="Engineering at LinkedIn"><p className="lead">Selected work across Notifications and Growth.</p></Intro><Cards items={cases} prefix="experience" /></>
  const evidence = caseEvidence[item.id]
  return <div className="reading">
    <a href="/experience/">All experience</a>
    <Intro eyebrow={`LinkedIn · ${item.area}`} title={item.title}><p className="lead">{item.problem}</p></Intro>
    {evidence ? <dl className="spec">
      {['My role', 'Implementation and collaboration', 'Outcome'].map((label, index) => <div key={label}><dt>{label}</dt><dd>{evidence[index]}</dd></div>)}
    </dl> : <p>Project responsibilities, implementation details, and outcomes are pending review.</p>}
    <Architecture steps={item.flow} caption="Illustrative workflow" />
    <h2>Design question</h2><p>{item.tradeoff}</p>
  </div>
}

function Lab({ item }) {
  if (!item) return <>
    <Intro eyebrow="Independent projects" title="Engineering Lab"><p className="lead">Explore architecture proposals and synthetic examples for three planned open-source applications.</p></Intro>
    <Cards items={lab} prefix="lab" />
    <section className="section"><h2>Other independent work</h2>{projects.map((project) => <article className="card" key={project.id}><p className="eyebrow">{project.phase}</p><h3>{project.title}</h3><p>{project.description}</p><ul>{project.planned.map((feature) => <li key={feature}>{feature}</li>)}</ul></article>)}</section>
  </>
  const specs = [
    ['Proposed stack', item.stack], ['Proposed data model', item.model], ['Draft API contract', item.api],
    ['Scale, security, and reliability', item.tradeoff], ['Testing and benchmark plan', item.testing], ['Development roadmap', item.roadmap],
  ]
  return <div className="reading">
    <a href="/lab/">Engineering Lab</a>
    <Intro eyebrow={`${item.area} · ${item.status}`} title={item.title}><p className="lead">{item.description}</p></Intro>
    <Architecture steps={item.flow} caption="Proposed architecture" />
    <Scenario samples={item.samples} />
    <h2>Planned capabilities</h2><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
    <h2>Engineering design</h2>
    <dl className="spec">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <p>Repository, product screenshots, live application demo, and measured benchmarks are pending implementation.</p>
  </div>
}

function Writing({ item }) {
  if (!item) return <><Intro eyebrow="Engineering notes" title="Technical writing"><p className="lead">Draft articles on distributed systems and applied AI.</p></Intro><Cards items={articles} prefix="writing" /></>
  return <article className="reading">
    <a href="/writing/">All writing</a>
    <Intro eyebrow={`${item.topic} · Draft`} title={item.title}><p className="lead">{item.description}</p></Intro>
    {item.sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
  </article>
}

function Recruiters() {
  return <>
    <Intro eyebrow="Recruiter Hub" title={profile.name}><p className="lead">Senior Full-Stack Software Engineer at LinkedIn with 8+ years of experience across product engineering, distributed systems, growth, and applied AI.</p><ContactLinks /></Intro>
    <div className="recruiter-grid">
      <section><h2>Career timeline</h2><ol className="timeline">{timeline.map(([company, role, dates, focus]) => <li key={company}><p className="eyebrow">{dates}</p><h3>{company}</h3><p><strong>{role}</strong></p><p>{focus}</p></li>)}</ol></section>
      <div>
        <section><h2>Core competencies</h2><p>React, TypeScript, Java, GraphQL, Kafka, distributed systems, production reliability, growth experimentation, and technical leadership.</p></section>
        <section><h2>Featured work</h2><ul><li><a href="/experience/server-driven-ui/">Server-driven UI migration</a></li><li><a href="/experience/notification-replay/">Notification Replay Tool</a></li><li><a href="/lab/sentinel/">Sentinel architecture proposal</a></li></ul></section>
        <section><h2>Education</h2><p><strong>Northeastern University</strong><br />M.S. in Information Systems</p><p><strong>Pune University</strong><br />B.E. in Electronics &amp; Telecommunication</p></section>
        <section><h2>Contact</h2><p><a href="mailto:ru91patil@gmail.com">ru91patil@gmail.com</a></p></section>
      </div>
    </div>
  </>
}

export default function App({ pathname = window.location.pathname }) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const route = routes.find((entry) => entry.path === path)
  const section = path.split('/')[1]
  const pages = { experience: Experience, lab: Lab, writing: Writing, recruiters: Recruiters }
  const Page = pages[section] || Home
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header path={path} />
    <main className="shell" id="main" tabIndex={-1}>
      {route ? <Page item={route.item} /> : <Intro eyebrow="404" title="Page not found"><a href="/">Return home</a></Intro>}
    </main>
    <footer className="shell footer"><a href="/">{profile.name}</a><a href="/recruiters/">Recruiter Hub</a><a href={profile.linkedin}>LinkedIn</a><a href={profile.github}>GitHub</a></footer>
  </>
}
