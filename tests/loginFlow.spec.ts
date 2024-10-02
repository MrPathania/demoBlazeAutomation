const { test, Page, Context } = require ('@playwright/test');
const { Login } = require ('../PageObjectModule/Login');

const data = JSON.parse(JSON.stringify(require('../loginCredentials.json')));
let baseUrl = 'https://www.demoblaze.com/index.html'


test('Login with Incorrect credentials', async ({ page, context }) => {
  await context.clearCookies();
  
  const login = new Login(page);
  await page.goto(baseUrl)
  
  await login.incorrectCredentials(data.incorrectCredentials.correctUsername, data.incorrectCredentials.incorrectPassword);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await login.againIncorrect(data.incorrectCredentials.incorrectUsername, data.incorrectCredentials.incorrectPassword);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await login.againIncorrect(data.incorrectCredentials.incorrectUsername, data.incorrectCredentials.correctPassword);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByLabel('Log in').getByLabel('Close').click();
  
});
test('login with correct credentials', async ({ page, context }) => {
  await context.clearCookies();

  const login = new Login(page);
  await login.correctCredentials(data.correctCredentials.username, data.correctCredentials.password);
});