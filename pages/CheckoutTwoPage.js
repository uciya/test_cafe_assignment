import { Selector, t, ClientFunction } from 'testcafe';
import config from '../config'

class CheckoutTwoPage {
    constructor () {
        this.cart_items              = Selector('.cart_item');
        this.item_price_wo_tax       = Selector('.summary_subtotal_label');
    }

    async ensure_page(){
        let current_url = ClientFunction(() => window.location.href);
        await t
            .expect(current_url()).contains(`${config.target_env.checkout_two_address}`);
        }

    async verify_item_count(added_item_count) {
        let cart_item_count = await this.cart_items.count;
        await t
            .expect(cart_item_count).eql(added_item_count);
    }

    async verify_total_price_wo_tax(){
        let cart_item_count = await this.cart_items.count;
        let items_total = 0;
        let item_price_text = ''
        let subtotal_text = ''
        for (let i=0; i < cart_item_count; i++){
            item_price_text = await this.cart_items.find('.inventory_item_price').nth(i).innerText;
            item_price_text = item_price_text.slice(1) //to get rid of the dollar sign
            items_total += parseFloat(item_price_text);
        }
        subtotal_text = await this.item_price_wo_tax.innerText;
        subtotal_text = subtotal_text.slice(13); //to get rid of the Item Total: $ part of the string
        await t
            .expect(parseFloat(subtotal_text)).eql(items_total);
    }
}

export default new CheckoutTwoPage();