import { test, expect } from "@playwright/test";
import { ArtPage } from "../page_objects/ArtPage";

test.describe("Add item to cart from product page", () => {
  test.beforeEach(async ({ page }) => {

  });

  test.skip("Product Page Add To Basket", async ({ page }) => {
    await page.goto("/");

    const artPage = new ArtPage();
    artPage.addToBasket()

    const addToBasketButton = page
      .locator('[data-qa="product-button"]')
      .first();

    await addToBasketButton.waitFor();
    await expect(await addToBasketButton).toHaveText("Add to Basket");
    await expect(await cartCount).toHaveText("0");
    await addToBasketButton.click();

    await expect(await addToBasketButton).toHaveText("Remove from Basket");
    await expect(await cartCount).toHaveText("1");

    const checkoutLink = page.getByRole("link", { name: "Checkout" });
    await checkoutLink.waitFor();
    await checkoutLink.click();

    await page.waitForURL("/basket");
    await expect(page).toHaveURL(/.*basket/);
  });
});
