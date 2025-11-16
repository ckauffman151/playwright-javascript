import { expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { RegisterPage } from './RegisterPage.js';

export class CheckoutPage {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;

        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        this.removeFromBasketButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timout:3000})
    }

    goToLoginPage = async () => {
        await this.continueToCheckoutButton.click();
        return new LoginPage(this.page);
    }

    goToRegisterPage = async () => {
        await this. continueToCheckoutButton.click();
    }

    removeTheCheapestItem = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()

        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace('$', '')
            return parseInt(withoutDollarSign)
        })

        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.removeFromBasketButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
}