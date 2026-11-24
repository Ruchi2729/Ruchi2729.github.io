import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes } from '../src/routes.js'

test('recruiter navigation, résumé, and saved theme work', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering scalable systems.')
  await page.getByRole('navigation').getByRole('link', { name: 'Recruiter Hub' }).click()
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

test('architecture and synthetic scenarios respond to input', async ({ page }) => {
  await page.goto('/lab/sentinel/')
  await page.getByRole('button', { name: 'Incident correlation' }).click()
  await expect(page.getByRole('button', { name: 'Incident correlation' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByLabel('Scenario').selectOption({ label: 'Queue lag increased' })
  await expect(page.getByText('Compare consumer throughput', { exact: false })).toBeVisible()
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
