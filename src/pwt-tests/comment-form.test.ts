import { test, expect } from '@playwright/test';

test.describe('Comment Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should not display comment form when not logged in', async ({ page }) => {
    await page.waitForSelector('.places__found');
    const firstOffer = await page.$('.place-card a');
    const offerUrl = firstOffer ? await firstOffer.getAttribute('href') : null;
    await page.goto(`http://localhost:5173${offerUrl}`);

    const commentForm = await page.$('.reviews__form');
    expect(commentForm).toBeNull();
  });

  test('should submit comment after logging in', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="email"]', 'valid@example.com');
    await page.fill('input[name="password"]', 'validpassword1');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5173/');
    await page.waitForSelector('.places__found');

    const firstOffer = await page.$('.place-card a');
    const offerUrl = firstOffer ? await firstOffer.getAttribute('href') : null;
    await page.goto(`http://localhost:5173${offerUrl}`);

    await page.waitForSelector('.offer__host-title');
    const commentForm = await page.$('.reviews__form');
    expect(commentForm).not.toBeNull();

    await page.click('label[for="5-stars"]');

    await page.fill('textarea[name="review"]', 'This is a test review with more than 50 characters.');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    const comments = await page.$$eval('.reviews__text', (elements) =>
      elements.map((el) => el.textContent)
    );
    expect(comments).toContain('This is a test review with more than 50 characters.');
  });
});
