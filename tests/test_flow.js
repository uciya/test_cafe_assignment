import config from '../config'
import test_params from '../data'

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutOnePage from '../pages/CheckoutOnePage';
import CheckoutTwoPage from '../pages/CheckoutTwoPage';


fixture `Swag Labs Flow Automation`
    .page `${config.target_env.baseUrl}`;

test('Check total sum of cart', async t => {
    let case_params = test_params.dataset_1;
    let item_count = case_params.item_count_to_add;
    await LoginPage.login(`${config.target_env.valid_username}`, `${config.target_env.valid_password}`);
    
    await InventoryPage.ensure_page("inventory_address");
    await InventoryPage.add_item_to_cart(item_count);
    await InventoryPage.verify_item_count(item_count);
    //await t.wait(3000);
    await InventoryPage.go_to_cart();

    await CartPage.ensure_page("cart_address");
    await CartPage.verify_item_count(item_count);
    await CartPage.go_to_checkoutOne();

    await CheckoutOnePage.ensure_page("checkout_one_address");
    await CheckoutOnePage
        .fill_in_form(case_params.customer_first_name, case_params.customer_last_name, case_params.customer_zip_code);
    await CheckoutOnePage.go_to_checkoutTwo();

    await CheckoutTwoPage.ensure_page("checkout_two_address");
    await CheckoutTwoPage.verify_item_count(item_count);
    await CheckoutTwoPage.verify_total_price_wo_tax();
    //await t.wait(5000);
});

