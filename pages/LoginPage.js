import { Selector, t } from 'testcafe';

class LoginPage {
    constructor () {
        this.username_input        = Selector('#user-name');
        this.password_input        = Selector('#password');
        this.login_button          = Selector('#login-button');
    }

    async login(username, password) {
        await t
            .maximizeWindow()
            .typeText(this.username_input, username)
            .typeText(this.password_input, password)
            .click(this.login_button);
    }
}

export default new LoginPage();