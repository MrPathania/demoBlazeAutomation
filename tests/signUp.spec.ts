const char = 'asdfasdfsadf45sdafasdc12scsdafwefsadczscads4312654231nbifoigbjytbl';
  const generateRandomString = (length:number) => {
      let randomString = '';
      for (let i = 0; i < length; i++) {
          randomString = randomString + char.charAt(Math.floor(Math.random()*char.length))
      }
      return randomString;
  }
  const username = generateRandomString(7)
  const password = generateRandomString(7)

  const { test: signupTest, Page: signupPage, Context: signUpContext, expect } = require ('@playwright/test');
  const {signUp} = require ('../PageObjectModule/signUp')
  const {Login : signLogin} = require('../PageObjectModule/Login')
  const {buyProduct} = require ('../PageObjectModule/buyProduct')
const productList = JSON.parse(JSON.stringify(require('../productList.json')))
let product = productList.mobile.Nexus6;

  signupTest('Create new account', async ({ page, context }) => {
    await context.clearCookies();
    
    const sign = new signUp(page);
    const login = new signLogin(page)
    const buy = new buyProduct(page)
    await sign.createAccount(username,password )
    await page.waitForTimeout(2000)
    await page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    const createdUsername = username;
    const createdPassword = password;
    console.log('created password = ',createdPassword)
    console.log('created Username = ',createdUsername)
   await page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  await login.correctCredentials(username,password);
  const usedUsername = username;
    const usedPassword = password;
    console.log('used password = ',usedPassword)
    console.log('used Username = ',usedUsername)
  const productName = await page.locator(`//a[normalize-space()= '${product}']`).textContent();

  await buy.selectOrderProduct(product)
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForEvent('domcontentloaded')
const addToCartProductName = await page.locator('.name').textContent();
  expect(productName).toBe(addToCartProductName)

await buy.addTocart();
page.waitForEvent('domcontentloaded')
const productOnCart = await page.locator(`//td[normalize-space()='${product}']`).first().textContent()
expect(productOnCart).toBe(addToCartProductName)


await buy.cardDetails();



});

