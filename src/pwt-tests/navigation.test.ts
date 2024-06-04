// pwt-tests/navigation.test.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Загрузка главной страницы перед каждым тестом
    await page.goto('http://localhost:5173');
  });

  test('should navigate to offer details page when clicking on a card', async ({ page }) => {
    await page.waitForSelector('.places__found');

    const offers = await page.$$('.place-card');
    expect(offers.length).toBeGreaterThan(0);

    const firstOfferLink = offers[0];
    await firstOfferLink.click();

    await page.waitForSelector('.offer__host-title');

    const url = page.url();
    expect(url).toContain('/offer/');
  });
});
