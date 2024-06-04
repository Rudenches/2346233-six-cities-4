import { test, expect } from '@playwright/test';

test.describe('Login Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'valid@example.com');
    await page.fill('input[name="password"]', 'validpassword1');

    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:5173/');

    expect(page.url()).toBe('http://localhost:5173/');
  });

  test('should not login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid');
    await page.fill('input[name="password"]', 'invalidpassword');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    expect(page.url()).toBe('http://localhost:5173/login');
  });
});
