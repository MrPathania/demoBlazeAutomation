import { ElementHandle, Locator, Page } from "@playwright/test";

class Login {

    

  constructor(page) {
    this.page = page;
     this.loginButton = page.getByRole('link', { name: 'Log in' });
     this.username = page.locator('#loginusername');
     this.password = page.locator('#loginpassword');
     this.login = page.locator(`//button[normalize-space()='Log in']`);
     this.baseUrl = 'https://www.demoblaze.com'
    
    

    }
async Url(){

  await this.page.goto(this.baseUrl)
}
    async correctCredentials(correctUsername, correctPassword){
        await this.page.goto(this.baseUrl)
        await this.loginButton.click();
        await this.username.click()
      await this.username.fill(correctUsername)
      await this.password.click()
      await this.password.fill(correctPassword)
      await this.login.click();

    }

    async incorrectCredentials(incorrectUsername, incorrectPassword){
   
      await this.loginButton.click();
      await this.username.click()
      await this.username.fill(incorrectUsername)
      await this.password.click()
      await this.password.fill(incorrectPassword)
      await this.login.click();
      await this.username.clear()
      await this.password.clear()

    }
    async againIncorrect(incorrectUsername, incorrectPassword){
   
     
      await this.username.clear()
      await this.password.clear()
      await this.username.click()
      await this.username.fill(incorrectUsername)
      await this.password.click()
      await this.password.fill(incorrectPassword)
      await this.login.click();

    }

}

module.exports= {Login}