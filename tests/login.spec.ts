import { test, expect } from '@playwright/test';
import login from "../helpers/login.ts";
import config from "../config/config.ts";
const { username } = config;
const { password } = config;
const { lockedOutUser } = config;

test('Successful login as standard user', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await expect(page.locator('//div[@class="inventory_list"]')).toBeVisible();
});

test('Login as locked out user', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, lockedOutUser , password);
    await expect(page.locator('//h3[contains(text(),"Epic sadface: Sorry, this user has been locked out")]')).toBeVisible();
});

test('Login with wrong password', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, 'password');
    await expect(page.locator('//h3[contains(text(),"Epic sadface: Username and password do not match a")]')).toBeVisible();
});

test('Login with wrong username', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, 'username', password);
    await expect(page.locator('div').filter({ hasText: /^Epic sadface: Username and password do not match any user in this service$/ })).toBeVisible();
});

test('Login with empty username and password', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, '', '');
    await expect(page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })).toBeVisible();
});


