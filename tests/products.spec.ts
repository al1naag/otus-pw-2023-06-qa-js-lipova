import { test, expect } from '@playwright/test';
import login from "../helpers/login.ts";
import config from "../config/config.ts";
const { username } = config;
const { password } = config;

test('Open the Product Page', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await page.locator('//div[normalize-space()="Sauce Labs Backpack"]').click();
    await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
    await expect(page.locator('//div[@class="inventory_details_name large_size"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('//div[@class="inventory_details_desc large_size"]')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect(page.locator('//div[@class="inventory_details_price"]')).toHaveText('$29.99');
});

test('Filtering from z to a', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await page.locator('[data-test="product_sort_container"]').selectOption('za');
    // await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
    // await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
    // await page.locator('[data-test="product_sort_container"]').selectOption('az');
});


