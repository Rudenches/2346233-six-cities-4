import { test, expect } from '@playwright/test';

test.describe('City Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should update offers when city is changed', async ({ page }) => {
    await page.waitForSelector('.places__found');

    const initialOffers: string[] = await page.$$eval('.place-card a', (links: (HTMLAnchorElement)[]) =>
      links.map((link) => link.href.split('/').pop() as string)
    );

    await page.click('text=Amsterdam');

    await page.waitForTimeout(1000);

    const updatedOffers: string[] = await page.$$eval('.place-card a', (links: (HTMLAnchorElement)[]) =>
      links.map((link) => link.href.split('/').pop() as string)
    );

    expect(initialOffers).not.toEqual(updatedOffers);
  });
});
