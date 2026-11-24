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
