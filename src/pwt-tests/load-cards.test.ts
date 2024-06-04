import { test, expect } from '@playwright/test';

test.describe('Card Loading Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should load card data from server', async ({ page }) => {
    await page.waitForSelector('.places__found');

    const offers = await page.$$('.place-card');
    expect(offers.length).toBeGreaterThan(0);
  });
});
