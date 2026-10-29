import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return <section id="projects" className="section shell" aria-labelledby="projects-title">
    <p className="eyebrow">02 / Personal projects</p>
    <h2 id="projects-title">Projects in progress</h2>
    <section aria-labelledby="better-life-title" className="projects-subsection">
      <div className="section-grid">
        <h3 id="better-life-title" className="projects-subtitle">Building for a <em>Better Life</em></h3>
        <p className="muted">A personal AI product idea exploring a simpler way to handle complex paperwork. Currently in planning and not launched. Expand the project details to explore its planned capabilities.</p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} number={index + 1} />)}
      </div>
    </section>
  </section>
}
