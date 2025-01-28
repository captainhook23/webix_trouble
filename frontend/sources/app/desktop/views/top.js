import { JetView } from 'webix-jet';
import ToolbarView from './menu/toolbar';

export default class TopView extends JetView {
    config() {
        const user = this.app.getService('user').getUser();
        console.log('%c User Info ', 'background: #7bf542; color: black;', user);

        return {
            paddingX: 2,
            paddingY: 2,
            rows: [ToolbarView, { $subview: true }],
        };
    }
    init() {}
}
