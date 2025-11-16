import { CheckoutPage } from './CheckoutPage';
import { isDekstopViewport } from '../utils/isDesktopViewport';

export class Navigation {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.myAccountLink = page.getByRole('link', { name: 'My Account' });
        this.artLink = page.getByRole('link', { name: 'Art' });
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
        this.basketCount = page.locator('[data-qa="header-basket-count"]');
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }

    //Top Menu links
    goToMyAccount = async () => {
        await this.myAccountLink.click();
    }

    goToArtPage = async () => {
        await this.artLink.click();
    }

    goToCheckoutPage = async () => {
        // if mobile viewport, first open the burger 
        if (!isDekstopViewport(this.page)) {
            this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
        await this.checkoutLink.click();
        return new CheckoutPage(this.page);
    }   

    getBasketCount = async () => {
        await this.basketCount.waitFor();
        const text = await this.basketCount.innerText();
        return parseInt(text);
    }
}




