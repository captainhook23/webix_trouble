import { JetView } from 'webix-jet';

export default class MenuView extends JetView {
    width(items) {
        return (this.app.config.size - 1.7) / 4 * items.length;
    }

    config() {
        const user = this.app.getService('user').getUser();
        const { _ } = this.app.getService('locale');

        const itemConfig = {
            view: 'button',
            css: 'menu-button webix_danger',
            type: 'icon',
            click: (id) => {
                const buttonLabel = this.$$(id).config.labelBelowMenu;
                $$('active-label').setValue(buttonLabel);
                localStorage.setItem('activeMenuItem', buttonLabel); // Save active item to localStorage
                this.show(id);
            },
        };

        const user_items = [
            {
                ...itemConfig,
                id: 'start',
                icon: 'mdi mdi-cart',
                labelBelowMenu: _('newBooking'),
            },
            {
                ...itemConfig,
                id: 'help',
                icon: 'mdi mdi-help-circle',
                labelBelowMenu: _('help'),
            },
            {
                ...itemConfig,
                id: 'reservations',
                icon: 'mdi mdi-calendar',
                labelBelowMenu: _('myBookings'),
            },
            {
                ...itemConfig,
                id: 'profile',
                icon: 'mdi mdi-account',
                labelBelowMenu: _('profile'),
            },
        ];

        const admin_items = [
            {
                ...itemConfig,
                id: 'dashboard',
                icon: 'mdi mdi-view-dashboard',
                labelBelowMenu: _('dashboard'),
            },
            {
                ...itemConfig,
                id: 'settings',
                icon: 'mdi mdi-cog',
                labelBelowMenu: _('settingAdministration'),
            },
            {
                ...itemConfig,
                id: 'user',
                icon: 'mdi mdi-account-group',
                labelBelowMenu: _('userAdministration'),
            },
            {
                ...itemConfig,
                id: 'adminreservations',
                icon: 'mdi mdi-calendar',
                labelBelowMenu: _('bookingAdministration'),
            },
            {
                ...itemConfig,
                id: 'parkings',
                icon: 'mdi mdi-car',
                labelBelowMenu: _('parkingAdministration'),
            },
        ];

        if (user.role === 'ppv_admin') {
            user_items.push(...admin_items);
        }

        const menu = {
            view: 'scrollview',
            id: 'menu',
            localId: 'menu',
            scroll: 'x',
            body: {
                padding: {
                    left: -0.7,
                },
                width: this.width(user_items),
                cols: user_items,
            },
        };

        const ui = {
            rows: [
                menu,
                {
                    view: 'label',
                    id: 'active-label', // ID for the label
                    height:20,
                    label: 'No item selected', // Default label text
                    css: 'menu-active-label',
                    align: 'center', // Align the label to the center
                },
            ],
        };

        return ui;
    }

    init() {
        webix.delay(() => {
            const menu = $$('menu');
            console.log(menu);
            menu.scrollTo(400,0)
        },this,null,20);


        
        const defaultLabel = 'Start'; // Default label if nothing is saved
        const savedLabel = localStorage.getItem('activeMenuItem') || defaultLabel;

        // Set the label and save default if needed
        $$('active-label').setValue(savedLabel);

        if (!localStorage.getItem('activeMenuItem')) {
            localStorage.setItem('activeMenuItem', defaultLabel);
        }


        this.on(this.app, 'app:resize', () => {
            const menu = $$('menu');
            const body = menu.getBody();
            body.define('width', this.width(body.getChildViews()));
            body.resize();
        });

        this.on(this.app, 'app:error:resolve', () => {
           const activeLabel = $$('active-label');
              if (activeLabel) {
                activeLabel.setValue('Error');
                //save the active menu item to local storage
                localStorage.setItem('activeMenuItem', 'Error');
            }
        });
    }
}
