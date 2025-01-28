import { JetView } from 'webix-jet';

export default class FaqView extends JetView {
    config() {
        const { _ } = this.app.getService('locale');

        

        const ui = {
            rows: [ { template: 'Hello World Hilfe' }],
        };
        return ui;
    }
    init() {}
}
