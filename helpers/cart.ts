const cart = {
    async addToCart({page}, item) {
        await page.locator(`//button[@id='add-to-cart-sauce-labs-${item}']`).click();
    },
    async removeFromCart({page}, item) {
        await page.locator(`//button[@id='remove-sauce-labs-${item}']`).click();
    },
}

export default cart;