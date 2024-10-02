import {test, expect, request, Browser, chromium} from '@playwright/test'
const {Login} = require ('./PageObjectModule/Login')
const data = JSON.parse(JSON.stringify(require('./loginCredentials.json')))
async function globalSetup() {
    const browser: Browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page =  await context.newPage() 
    const login = new Login(page)
    await page.pause()
    await login.correctCredentials(data.correctCredentials.username, data.correctCredentials.password)

    await page.waitForSelector('#logout2');

    await page.context().storageState({path:"./LoginState.json"})
    await page.close()
    
}

export default globalSetup;