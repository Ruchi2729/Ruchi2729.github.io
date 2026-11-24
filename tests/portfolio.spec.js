import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage navigation and résumé download work', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Purpose.')
  await page.getByRole('navigation').getByRole('link', { name: 'Journey' }).click()
  await expect(page).toHaveURL(/#journey$/)
  await expect(page.getByRole('heading', { name: 'Where I am. Where I’m headed.' })).toBeVisible()
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download résumé' }).click()
  expect((await download).suggestedFilename()).toBe('Resume-Full-Stack-Updated.pdf')
  await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:ru91patil@gmail.com')
  expect(errors).toEqual([])
})

test('the GIF can be paused and restarted', async ({ page }) => {
  await page.goto('/')
  const art = page.getByRole('img', { name: 'A woman at her laptop looking out at a spiral galaxy.' })
  await expect.poll(() => art.evaluate((image) => image.currentSrc)).toMatch(/impact-animation\.gif$/)
  await page.getByRole('button', { name: 'Pause animation' }).click()
  await expect.poll(() => art.evaluate((image) => image.currentSrc)).toMatch(/impact-still\.png$/)
  await page.getByRole('button', { name: 'Play animation' }).click()
  await expect.poll(() => art.evaluate((image) => image.currentSrc)).toMatch(/impact-animation\.gif$/)
})

test('reduced motion uses the still artwork', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Pause animation' })).toBeHidden()
  const art = page.getByRole('img')
  await expect.poll(() => art.evaluate((image) => image.currentSrc)).toMatch(/impact-still\.png$/)
})

test('homepage fits its viewport and passes automated accessibility checks', async ({ page }) => {
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})
