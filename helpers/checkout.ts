const checkout = {
    async fillInCheckoutStepOne({page}, firstName, lastName, zip) {
        await page.locator('//input[@id="first-name"]').fill(firstName);
        await page.locator('//input[@id="last-name"]').fill(lastName);
        await page.locator('//input[@id="postal-code"]').fill(zip);
    },
}

export default checkout;