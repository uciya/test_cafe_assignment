import { Selector, t } from 'testcafe';
import BasePage from './BasePage';

class CartPage extends BasePage {
    constructor () {
        super();
        this.cart_items              = Selector('.cart_item');
        this.checkout_button         = Selector('.checkout_button').withText('CHECKOUT');
    }
    
    async verify_item_count(added_item_count) {
        let cart_item_count = await this.cart_items.count;
        await t
            .expect(cart_item_count).eql(added_item_count)
    }

    async go_to_checkoutOne() {
        await t
            .click(this.checkout_button, { visibilityCheck: true });
    }
}

export default new CartPage();