import { JetView } from 'webix-jet';

export default class UnauthorizedView extends JetView {
    config() {
        return {
            cols: [
                {
                    rows: [
                        { template: 'You are not authorized to access this page.', type: 'header' },
                        {
                            view: 'button',
                            value: 'Go to Home',
                            css: 'webix_primary',
                            click: () => {
                                this.app.show('/top/newBooking'); // Redirect to the home page
                            },
                        },
                        {},
                    ],
                },
            ],
        };
    }
}
