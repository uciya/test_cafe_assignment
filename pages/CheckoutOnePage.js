import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

class CheckoutOnePage extends BasePage {
    constructor () {
        super();
        this.first_name              = Selector('#first-name');
        this.last_name               = Selector('#last-name');
        this.zip_code                = Selector('#postal-code');
        this.continue_button         = Selector('#continue').withAttribute('value', 'Continue');
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