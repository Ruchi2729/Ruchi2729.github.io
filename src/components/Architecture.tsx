import { useState } from 'react'

export function Architecture({ steps, caption }: { steps: string[]; caption: string }) {
  const [selected, setSelected] = useState(0)
  return (
    <figure className="architecture">
      <figcaption>{caption}</figcaption>
      <ol className="flow">
        {steps.map((step, index) => (
          <li key={step}>
            <button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{step}</button>
          </li>
        ))}
      </ol>
      <p aria-live="polite">
        {steps[selected]}{selected > 0 && ` receives input from ${steps[selected - 1]}`}{selected < steps.length - 1 && ` → ${steps[selected + 1]}`}.
      </p>
    </figure>
  )
}

export function Scenario({ samples }: { samples: [string, string][] }) {
  const [sample, setSample] = useState(0)
  return (
    <section className="demo" aria-labelledby="scenario-label">
      <h2 id="scenario-label">Interactive concept preview</h2>
      <p>Synthetic examples illustrate the proposed workflow.</p>
      <label htmlFor="scenario">Scenario</label>
      <select id="scenario" value={sample} onChange={(event) => setSample(Number(event.target.value))}>
        {samples.map(([label], index) => <option key={label} value={index}>{label}</option>)}
      </select>
      <div className="demo-result" aria-live="polite"><strong>{samples[sample][0]}</strong><p>{samples[sample][1]}</p></div>
    </section>
  )
}
