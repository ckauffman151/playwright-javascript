import {test, expect} from '@playwright/test';
import { ArtPage } from '../page_objects/ArtPage';
import { Navigation } from '../page_objects/Navigation';
import { deliveryDetails as userAddress } from "../Data/deliveryDetails";
import { paymentDetails } from '../Data/paymentDetails';


    /**
     * @param {import('@playwright/test').Page} page
     */

test("New user full end-to-end test journey", async ({page}) => {
    //Go to homepage
    const artPage = new ArtPage(page);
    await artPage.visitArtPage(); 
    await artPage.addProductToBasket(0);
    await artPage.addProductToBasket(1);
    await artPage.addProductToBasket(2);
    
    const navigation = new Navigation(page);
    const checkoutPage = await navigation.goToCheckoutPage();
    await page.waitForURL('/basket');
    await checkoutPage.removeTheCheapestItem()

    const loginPage = await checkoutPage.goToLoginPage();
    const registerPage = await loginPage.register(); 
    
    const deliveryDetailsPage = await registerPage.registerNewUser();
    await deliveryDetailsPage.fillInDeliveryDetails(userAddress);
    await deliveryDetailsPage.saveDetails()

    const paymentPage = await deliveryDetailsPage.continueToPayment()
    await paymentPage.activateDiscount()
    await paymentPage.enterCardDetails(paymentDetails);
  
    await page.waitForURL('/thank-you')
   const successHeader = await page.locator('h1')
   await expect(successHeader).toHaveText('Thank you for shopping with us!');
})

