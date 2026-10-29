export default function ProjectCard({ project, number }) {
  return <article className="project-card" aria-labelledby={`project-${project.id}`}>
    <div className="project-meta">
      <span className="project-number" aria-hidden="true">0{number}</span>
      <span className="project-status">{project.status}</span>
    </div>
    <h3 id={`project-${project.id}`}>{project.title}</h3>
    <p className="project-phase">{project.phase}</p>
    <p className="muted">{project.description}</p>
    <details className="project-disclosure">
      <summary>Project details<span className="sr-only"> for {project.title}</span></summary>
      <div className="project-disclosure-content">
        <h4>Implementation status</h4>
        {project.implemented.length > 0 ? <ul className="project-details">
          {project.implemented.map(feature => <li key={feature}>{feature}</li>)}
        </ul> : <p>No implemented features are being presented yet.</p>}
        {project.planned.length > 0 ? <>
          <h4>Planned features</h4>
          <ul className="project-details">
            {project.planned.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
        </> : <p>Product details will be added when the idea is defined.</p>}
        {project.proposedModel && <>
          <h4>Proposed model</h4>
          <p>{project.proposedModel}</p>
          <p className="project-model-note">Planning only; pricing and features may change before launch.</p>
        </>}
      </div>
    </details>
    {project.tags.length > 0 && <ul className="project-tags" aria-label="Project themes">
      {project.tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>}
  </article>
}
