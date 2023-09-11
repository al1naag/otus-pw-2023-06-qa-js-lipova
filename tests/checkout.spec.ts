import { test, expect } from '@playwright/test';
import login from "../helpers/login.ts";
import cart from "../helpers/cart.ts";
import checkout from "../helpers/checkout.ts";
import config from "../config/config.ts";
const { username } = config;
const { password } = config;
const { firstName } = config;
const { lastName } = config;
const { zip } = config;

test('Checkout from the cart: Step One', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await expect(page).toHaveURL(/.*cart/);
    await page.locator('//button[@id="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await expect(page.locator('//div[@class="checkout_info"]')).toBeVisible();
    await checkout.fillInCheckoutStepOne({page}, firstName, lastName, zip)
    await expect(page.locator('//input[@id="first-name"]')).toHaveValue(firstName)
    await expect(page.locator('//input[@id="last-name"]')).toHaveValue(lastName)
    await expect(page.locator('//input[@id="postal-code"]')).toHaveValue(zip)
});

test('Checkout from the cart: Step Two', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, firstName, lastName, zip)
    await page.locator('//input[@id="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(page.locator('//div[@class="inventory_item_name"]')).toHaveText('Sauce Labs Bike Light');
    await expect(page.locator('//div[@class="inventory_item_price"]')).toHaveText('$9.99');
    await expect(page.locator('//div[@class="cart_quantity"]')).toHaveText('1');
    await expect(page.locator('//div[@class="summary_subtotal_label"]')).toHaveText('Item total: $9.99');
    await expect(page.locator('//div[@class="summary_tax_label"]')).toHaveText('Tax: $0.80');
    await expect(page.locator('//div[@class="summary_info_label summary_total_label"]')).toHaveText('Total: $10.79');
});

test('Checkout from the cart with empty First Name : Step Two', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, '', lastName, zip)
    await page.locator('//input[@id="continue"]').click();
    await expect(page.locator('//h3[normalize-space()="Error: First Name is required"]')).toBeVisible();
});

test('Checkout from the cart with empty Last Name : Step Two', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, firstName, '', zip)
    await page.locator('//input[@id="continue"]').click();
    await expect(page.locator('//h3[normalize-space()="Error: Last Name is required"]')).toBeVisible();
});

test('Checkout from the cart with empty Zip/Postal Code : Step Two', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, firstName, lastName, '')
    await page.locator('//input[@id="continue"]').click();
    await expect(page.locator('//h3[normalize-space()="Error: Postal Code is required"]')).toBeVisible();
});


test('Checkout from the cart: Complete checkout', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, firstName, lastName, zip)
    await page.locator('//input[@id="continue"]').click();
    await page.locator('//button[@id="finish"]').click();
    await expect(page).toHaveURL(/.*checkout-complete/);
    await expect(page.locator('//h2[normalize-space()="Thank you for your order!"]')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Your order has been dispatched, and will arrive just as fast as the pony can get there!$/ })).toBeVisible();
    await page.locator('//button[@id="back-to-products"]').click();
    await expect(page).toHaveURL(/.*inventory/);
});

test('Cancel checkout from the cart: Step One', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await page.locator('//button[@id="cancel"]').click();
    await expect(page).toHaveURL(/.*cart/);
});

test('Cancel checkout from the cart: Step Two', async ({ page }) => {
    await page.goto('/');
    await login.login({page}, username, password);
    await cart.addToCart({page}, 'bike-light')
    await page.locator('//a[@class="shopping_cart_link"]').click();
    await page.locator('//button[@id="checkout"]').click();
    await checkout.fillInCheckoutStepOne({page}, firstName, lastName, zip)
    await page.locator('//input[@id="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await page.locator('//button[@id="cancel"]').click();
    await expect(page).toHaveURL(/.*inventory/);
});