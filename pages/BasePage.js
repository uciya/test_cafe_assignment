import { t, ClientFunction } from 'testcafe';
import config from '../config'

module.exports = class BasePage {

    async ensure_page(environment, page_address){
        let current_url = ClientFunction(() => window.location.href);
        await t
            .expect(current_url()).contains(`${config[environment][page_address]}`);
    }
}