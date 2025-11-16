import { DeliveryDetailsPage } from './DeliveryDetailsPage';
import { PaymentPage } from './PaymentPage';
import { RegisterPage } from './RegisterPage';

export class LoginPage {

     /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByRole('textbox', { name: 'E-Mail'});
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    login = async (email, password) => {
        
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new DeliveryDetailsPage(this.page);
    }

    register = async () => {
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/, {timeout:3000})
        return new RegisterPage(this.page);
    }

}