import { test, expect } from "@playwright/test";
import { MyAccountPage } from "../page_objects/MyAccountPage";
import { getLoginToken } from "../utils/api-calls/getLoginTokens"
import { adminDetails } from "../Data/userDetails";
import * as dotenv from 'dotenv';
dotenv.config();


test('My Account Page - Using cookie injection', async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

    await page.route('**/api/user**', route => {
        route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ token: loginToken, message: 'Mocked token response' }),
        });
    },);
    // Inject the login token into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit() 
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = `token=${loginTokenInsideBrowserCode}`}, [loginToken])
    
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    expect(await myAccount.getErrorMessageText()).toBe('Mocked token response');
})