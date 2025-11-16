import { PaymentPage } from './PaymentPage';
import { expect } from '@playwright/test';

export class DeliveryDetailsPage {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;

        this.firstName = page.locator('[data-qa="delivery-first-name"]');
        this.lastName = page.locator('[data-qa="delivery-last-name"]');
        this.street = page.locator('[data-qa="delivery-address-street"]');
        this.postCode = page.locator('[data-qa="delivery-postcode"]');
        this.City = page.locator('[data-qa="delivery-city"]'); 
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.ContinueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]');
    }

    fillInDeliveryDetails = async (userAddress) => {
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName);
        await this.lastName.fill(userAddress.lastName);
        await this.street.fill(userAddress.street);
        await this.postCode.fill(userAddress.postCode);
        await this.City.fill(userAddress.city);
        await this.countryDropdown.selectOption(userAddress.country);
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        //await this.saveAddressContainer.waitFor
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);
        await this.savedAddressFirstName.waitFor();
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())

        await this.savedAddressLastName.first().waitFor();
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())

        await this.savedAddressStreet.first().waitFor();
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.street.inputValue())

        await this.savedAddressCity.first().waitFor();
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.City.inputValue())

        await this.savedAddressPostcode.first().waitFor();
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCode.inputValue())

        await this.savedAddressCountry.first().waitFor();
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () => {
        await this.ContinueToPaymentButton.waitFor();
        await this.ContinueToPaymentButton.click();  
        await this.page.waitForURL(/\/payment/, { timeout: 3000})     //'/payment');   
        return new PaymentPage(this.page);  
    }      

}