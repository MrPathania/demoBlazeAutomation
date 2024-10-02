import { ElementHandle, Locator, Page } from "@playwright/test";

class buyProduct {

    

  constructor(page) {
    this.page = page;
    this.addToCart = page.getByRole('link', { name: 'Add to cart' });
    this.cartButton = page.getByRole('link', { name: 'Cart', exact: true });
    this.placeOrder = page.getByRole('button', { name: 'Place Order' });
    this.name =page.getByLabel('Total:')
    this.country = page.getByLabel('Country:')
    this.city = page.getByLabel('City:')
    this.creditCard = page.getByLabel('Credit Card:')
    this.month = page.getByLabel('Month:')
    this.year = page.getByLabel('Year:')
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' })
    this.okBUtton = page.getByRole('button', { name: 'OK' })

    }

    async selectOrderProduct(product){
        await this.page.locator(`//a[normalize-space()='${product}']`).click()
        
        
    }
    
    async addTocart(){
        await this.addToCart.click()
        await this.cartButton.click()
        
    }
    async cardDetails(){
        await this.placeOrder.click()
        await this.name.fill('Ayush Pathania')
        await this.country.fill('India')
        await this.city.fill('Delhi')
        await this.creditCard.fill('42424242424242')
        await this.month.fill('October')
        await this.year.fill('2024')
        await this.purchaseButton.click()
        await this.okBUtton.click()
    }

    

}

module.exports= {buyProduct}