import { expect } from '@playwright/test';


export class PaymentPage {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;

        this.creditCardOwner = page.getByRole('textbox', { name: 'Credit card owner' });
        this.creditCardNumber = page.getByRole('textbox', { name: 'Credit card number' });
        this.expiryDateInput = page.getByRole('textbox', { name: 'Valid until' });
        this.cvcInput = page.getByRole('textbox', { name: 'Credit card CVC' });
        this.payButton = page.getByRole('button', { name: 'Pay' });
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalAfterDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.totalBeforeDiscount = page.locator('[data-qa="total-value"]') 
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        //OPtion 1 for laggy inputs: using .fill() with await expect
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        expect(await this.totalAfterDiscount.isVisible()).toBe(false)
        expect(await this.discountActivatedMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActivatedMessage.waitFor()
        expect(await this.discountActivatedMessage.innerText()).toBe('Discount activated!')

        const beforeDiscount = await this.ridOfDollarCharacter(await this.totalBeforeDiscount.innerText())
        const afterDiscount = await this.ridOfDollarCharacter(await this.totalAfterDiscount.innerText())
        expect(afterDiscount).toBeLessThan(beforeDiscount)   
    }

    ridOfDollarCharacter = async (text) => {
        return parseInt(await text.replace('$', ""))
    }


    enterCardDetails = async (paymentDetails) => {
        await this.creditCardOwner.fill(paymentDetails.cardOwner);
        await this.creditCardNumber.fill(paymentDetails.cardNumber);
        await this.expiryDateInput.fill(paymentDetails.expiryDate);
        await this.cvcInput.fill(paymentDetails.cvc);
        await this.payButton.click();
    }
}