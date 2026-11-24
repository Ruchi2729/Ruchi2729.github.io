import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({ html: false })

const journalMarkdown = {
  name: 'journal-markdown',
  transform(source, id) {
    if (!id.endsWith('.md') || !id.includes('/src/journal/')) return null
    return { code: `export default ${JSON.stringify(markdown.render(source))}`, map: null }
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [journalMarkdown, react(), tailwindcss()],
})
