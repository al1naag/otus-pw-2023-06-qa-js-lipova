const login = {
    async login({page}, username,password) {
        await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill(password);
        await page.locator('[data-test="login-button"]').click();
    },
}

export default login;