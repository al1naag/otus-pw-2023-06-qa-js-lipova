import { test, expect } from '@playwright/test';
import login from "../helpers/login.ts";
import cart from "../helpers/cart.ts";
import config from "../config/config.ts";
const { username } = config;
const { password } = config;

test('Add item to the cart: Check the badge', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'backpack');
    await expect(page.locator('//span[@class="shopping_cart_badge"]')).toHaveText('1');
});

test('Add item to the cart: Check the cart', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'backpack');
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('//div[@class="inventory_item_name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('//div[@class="inventory_item_price"]')).toHaveText('$29.99');
    await expect(page.locator('//div[@class="cart_quantity"]')).toHaveText('1');
});

test('Add item to the cart from Products Page', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await page.locator('//div[normalize-space()="Sauce Labs Backpack"]').click();
    await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
    await cart.addToCart({page}, 'backpack');
    await expect(page.locator('//span[@class="shopping_cart_badge"]')).toHaveText('1');
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('//div[@class="inventory_item_name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('//div[@class="inventory_item_price"]')).toHaveText('$29.99');
    await expect(page.locator('//div[@class="cart_quantity"]')).toHaveText('1');
});

test('Removing the item from the cart', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await expect(page).toHaveURL(/.*cart/);
    await cart.removeFromCart({page}, 'bike-light');
    await expect(page.locator('//div[@class="inventory_item_name"]')).not.toBeVisible();
    await expect(page.locator('//div[@class="inventory_item_price"]')).not.toBeVisible();
    await expect(page.locator('//div[@class="cart_quantity"]')).not.toBeVisible();
});

test('Removing the item from the cart on Products page', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await expect(page.locator('//span[@class="shopping_cart_badge"]')).toHaveText('1');
    await cart.removeFromCart({page}, 'bike-light');
    await expect(page.locator('//span[@class="shopping_cart_badge"]')).not.toBeVisible();
});

test('Continue shopping from the cart', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await expect(page).toHaveURL(/.*cart/);
    await page.locator('//button[@id=\'continue-shopping\']').click();
    await expect(page).toHaveURL(/.*inventory/);
});
