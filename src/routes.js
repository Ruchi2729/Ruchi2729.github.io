import { articles, cases } from './data/portfolio.js'

import { personalPages } from './data/personal.js'

export const siteUrl = 'https://ruchi2729.github.io'
export const routes = [
  { path: '/', title: 'Ruchira Patil | Senior Software Engineer', description: 'Senior Software Engineer at LinkedIn. Explore Ruchira Patil’s work in full-stack engineering, distributed systems, growth, and applied AI.' },
  { path: '/experience/', title: 'Professional Experience', description: 'Selected engineering work at LinkedIn across notifications, growth, and applied AI.' },
  { path: '/writing/', title: 'Technical Journal', description: 'Practical engineering notes on distributed systems, reliability, and applied AI.' },
  { path: '/recruiters/', title: 'Recruiter Hub', description: 'Ruchira Patil’s professional summary, résumé, education, and contact links.' },
  ...personalPages,
  { path: '/contact/', title: 'Contact', description: 'Connect with Ruchira Patil about engineering roles and collaborations.' },
  ...cases.map((item) => ({ path: `/experience/${item.id}/`, title: item.title, description: item.problem, item })),
  ...articles.map((item) => ({ path: `/writing/${item.id}/`, title: item.title, description: item.description, item })),
]
