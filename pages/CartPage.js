import { Selector, t, ClientFunction } from 'testcafe';
import config from '../config'

class CartPage {
    constructor () {
        this.cart_items              = Selector('.cart_item');
        this.checkout_button         = Selector('.checkout_button').withText('CHECKOUT');
    }

    async ensure_page(){
        let current_url = ClientFunction(() => window.location.href);
        await t
            .expect(current_url()).contains(`${config.target_env.cart_address}`);
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