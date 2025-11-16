import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDekstopViewport } from "../utils/isDesktopViewport";

export class ArtPage {

/**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]');
        this.navigation = new Navigation(page);
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
      }

      visitArtPage = async () => {
        await this.page.goto("/");
      }

      sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting)
      }

      addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        // only desktop viewport
        let basketCountBeforeAdding
        if(isDekstopViewport(this.page)){
          basketCountBeforeAdding = await this.navigation.getBasketCount();
          }
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        // only desktop viewport
        if(isDekstopViewport(this.page)){
          const basketCountAfterAdding = await this.navigation.getBasketCount();
          expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }
        
      }



}


