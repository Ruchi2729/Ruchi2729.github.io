import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage navigation and résumé download work', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Senior Software Engineer, Full Stack Engineer, Distributed Systems and Infra')
  await page.getByRole('navigation').getByRole('link', { name: 'Journey' }).click()
  await expect(page).toHaveURL(/#journey$/)
  await expect(page.getByRole('heading', { name: 'Where I am. Where I’m headed.' })).toBeVisible()
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Résumé' }).click()
  expect((await download).suggestedFilename()).toBe('Resume-Full-Stack-Updated.pdf')
  await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:ru91patil@gmail.com')
  expect(errors).toEqual([])
})

test('the hero shows a single still picture and a short title', async ({ page }) => {
  await page.goto('/')
  const hero = page.getByRole('region', { name: 'Senior Software Engineer, Full Stack Engineer, Distributed Systems and Infra' })
  const image = hero.getByRole('img')
  await expect(image).toHaveCount(1)
  expect((await image.boundingBox()).width).toBe(page.viewportSize().width)
  await expect(page.getByText('Ruchira Patil', { exact: true })).toHaveCount(1)
  await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBe(1440)
  await expect(hero.locator('p')).toHaveCount(0)
})

test('homepage fits its viewport and passes automated accessibility checks', async ({ page }) => {
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})
