import { DeliveryDetailsPage } from './DeliveryDetailsPage';

export class RegisterPage {

    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page

        this.emailInput = page.getByRole('textbox', { name: 'E-Mail'});
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    generateRandomNumberFiveDigits() {
        let number = Math.floor(Math.random() * 90000) + 1000;
        return number.toString()
    }

    registerNewUser = async () => {
        //const emailId = uuidv4()
        const emailId = this.generateRandomNumberFiveDigits()
        const email = emailId + "@gmail.com"
        await this.emailInput.fill(email);
        //const password = uuidv4()
        const password = this.generateRandomNumberFiveDigits()
        await this.passwordInput.fill(password);
        await this.registerButton.click();
        return new DeliveryDetailsPage(this.page);
    }
}