import { Selector, t, ClientFunction } from 'testcafe';
import config from '../config'

class CheckoutOnePage {
    constructor () {
        this.first_name              = Selector('#first-name');
        this.last_name               = Selector('#last-name');
        this.zip_code                = Selector('#postal-code');
        this.continue_button         = Selector('#continue').withAttribute('value', 'Continue');
    }

    async ensure_page(){
        let current_url = ClientFunction(() => window.location.href);
        await t
            .expect(current_url()).contains(`${config.target_env.checkout_one_address}`);
        }
    
    async fill_in_form(first_name, last_name, zip_code) {
        await t
            .typeText(this.first_name, first_name)
            .typeText(this.last_name, last_name)
            .typeText(this.zip_code, zip_code);
    }

    async go_to_checkoutTwo() {
        await t
            .click(this.continue_button);
    }
}

export default new CheckoutOnePage();