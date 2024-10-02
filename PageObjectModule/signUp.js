class signUp {

    

    constructor(page) {
      this.page = page;
       this.signupButton = page.getByRole('link', { name: 'Sign up' });
       this.username = page.locator('#sign-username');
       this.password = page.locator('#sign-password');
       this.signup = page.getByRole('button', { name: 'Sign up' });
       this.baseUrl = 'https://www.demoblaze.com'
      
      
  
      }
  async Url(){
  
    await this.page.goto(this.baseUrl)
  }

  async createAccount(username, password){
    await this.page.goto(this.baseUrl)
    await this.signupButton.click();
  await this.username.fill(username)
  await this.password.fill(password)
  await this.signup.click();
}

}

module.exports= {signUp}