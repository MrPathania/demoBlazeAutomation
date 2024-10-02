import {test, expect, request} from '@playwright/test'
import { text } from 'stream/consumers';
const { Login } = require ('../PageObjectModule/Login');
const {buyProduct} = require ('../PageObjectModule/buyProduct')
const productList = JSON.parse(JSON.stringify(require('../productList.json')))
let product = productList.mobile.Nexus6;



test('login with already saved state', async ({ page, context }) => {
    const login = new Login(page)
    const buy = new buyProduct(page);
   await login.Url()

    const productName = await page.locator(`//a[normalize-space()= '${product}']`).textContent();

    await buy.selectOrderProduct(product)

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  const addToCartProductName = await page.locator('.name').textContent();
    expect(productName).toBe(addToCartProductName)

  await buy.addTocart();
  const productOnCart = await page.locator(`//td[normalize-space()='${product}']`).first().textContent()
  expect(productOnCart).toBe(addToCartProductName)
  

  await buy.cardDetails();
 
});

