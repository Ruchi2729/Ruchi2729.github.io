import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes } from '../src/routes.js'

test('recruiter navigation, résumé, and saved theme work', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Calm mind. Complex solutions.')
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Recruiter Hub' }).click()
  await expect(page).toHaveURL(/\/recruiters\/$/)
  await expect(page.getByRole('heading', { name: 'Career timeline' })).toBeVisible()
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download résumé' }).click()
  expect((await download).suggestedFilename()).toBe('Resume-Full-Stack-Updated.pdf')
  await page.getByLabel('Color theme').selectOption('dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByLabel('Color theme')).toHaveValue('dark')
  expect(errors).toEqual([])
})

test('case study architecture responds to input', async ({ page }) => {
  await page.goto('/experience/server-driven-ui/')
  const renderer = page.getByRole('button', { name: 'Client renderer' })
  await renderer.click()
  await expect(renderer).toHaveAttribute('aria-pressed', 'true')
})

for (const { path } of routes) {
  test(`${path} renders without overflow and passes automated accessibility checks`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width)
    await page.getByLabel('Color theme').selectOption('light')
    expect((await new AxeBuilder({ page }).analyze()).violations.map(({ id, nodes }) => [id, nodes.map(({ target }) => target)])).toEqual([])
    await page.getByLabel('Color theme').selectOption('dark')
    expect((await new AxeBuilder({ page }).analyze()).violations.map(({ id, nodes }) => [id, nodes.map(({ target }) => target)])).toEqual([])
  })
}

test('the signature story supports skipping, replaying, and manual scene selection', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Skip animation' }).click()
  await expect(page.getByRole('button', { name: 'Possibilities' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Replay animation' }).click()
  await expect(page.getByRole('button', { name: 'Breathe' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Create', exact: true }).click()
  await expect(page.getByText('Ideas. Code. Impact.')).toBeVisible()
})

test('reduced motion keeps the story still and allows manual scenes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Replay animation' })).toBeHidden()
  await expect(page.getByRole('button', { name: 'Breathe' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Rise' }).click()
  await expect(page.getByText('Rise. Learn. Build.')).toBeVisible()
})
