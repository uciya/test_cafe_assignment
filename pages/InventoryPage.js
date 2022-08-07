import { Selector, t, ClientFunction } from 'testcafe';
import config from '../config'

class InventoryPage {
    constructor () {
        this.inventory_items         = Selector('.inventory_item');
        this.cart_link               = Selector('.shopping_cart_link');
        this.cart_item_count         = Selector('.shopping_cart_badge');
    }

    async ensure_page(){
        let current_url = ClientFunction(() => window.location.href);
        await t
            .expect(current_url()).contains(`${config.target_env.inventory_address}`);
        }
    
    async add_item_to_cart(item_count_to_add) {
        let target_item = null;
        let item_count = await this.inventory_items.count;
        let index_array = Array.from(Array(item_count).keys());
        let random_index = 0;

        for(let i=0; i < item_count_to_add; i++){
            random_index = index_array.pop(Math.floor(Math.random() * index_array.length));
            target_item = this.inventory_items.find('.btn_inventory').nth(random_index);
            await t
                .scrollIntoView(target_item, { visibilityCheck: true })
                .click(target_item);
        }
    }

    async verify_item_count(added_item_count){
        await t
            .scrollIntoView(this.cart_item_count, { visibilityCheck: true })
            .expect(this.cart_item_count.innerText).eql(added_item_count.toString());
    }

    async go_to_cart() {
        await t
            .click(this.cart_link, { visibilityCheck: true });
    }
}

export default new InventoryPage();
