import { JetView, plugins } from 'webix-jet';

export default class ToolbarView extends JetView {
    config() {
        const { _, getLang, setLang } = this.app.getService('locale');
        const user = this.app.getService('user').getUser();
        const userrole = user.role;
        const username = `${user.firstname} ${user.lastname}`;

        var suva = {
            template: "<img src='sources/assets/Suva_RGB.png' width=86 height=20></img>",
            width: 100,
            padding: 0,
        };

        var ppv = {
            view: 'label',
            width: 150,
            label: this.app.config.name + ' ' + this.app.config.version,
        };

        var menu = {
            view: 'menu',
            id: 'menu',
            localId: 'sidebar',
            select: true,
            data: [
                {
                    id: 'start',
                    icon: 'mdi mdi-shape-square-rounded-plus',
                    value: _('newbooking'),
                },
                {
                    id: 'faq',
                    icon: 'mdi mdi-frequently-asked-questions',
                    value: _('faq'),
                },
            ],
            on: {
                onItemClick: function (id) {
                    if (id == 'administration') {
                        return false;
                    }
                    webix.message('Menu click: ' + id);
                    this.show(id);
                },
            },
        };

        if (userrole == 'ppv_admin') {
            menu.data.push({
                id: 'administration',
                icon: 'mdi mdi-table',
                value: _('administration'),
                config: {
                    on: {
                        onItemClick: function (id) {
                            webix.message(`Submenu click: ${id} and forwarding to ${id}`);
                        },
                    },
                },
                submenu: [
                    {
                        id: 'dashboard',
                        value: _('dashboard'),
                        icon: 'mdi mdi-view-dashboard',
                        href: '#!/top/dashboard',
                    },
                    { id: 'settings', value: _('settings'), icon: 'mdi mdi-cog', href: '#!/top/settings' },
                    { id: 'parkings', value: _('parkings'), icon: 'mdi mdi-car', href: '#!/top/parkings' },
                    { id: 'user', value: _('user'), icon: 'mdi mdi-account', href: '#!/top/user' },
                    { id: 'bookings', value: _('bookings'), icon: 'mdi mdi-calendar', href: '#!/top/reservations' },
                ],
            });
        }

        var language = {
            view: 'menu',
            id: 'language',
            width: 420,
            localId: 'sidebar',
            select: true,
            type: {
                subsign: true,
            },
            data: [
                {
                    id: 'language',
                    icon: 'mdi mdi-translate',
                    value: _(getLang()),
                    config: {
                        on: {
                            onItemClick: function (id) {
                                webix.message('Selected: ' + _(id));
                                setLang(id);
                            },
                        },
                    },
                    submenu: [
                        { id: 'de', value: _('de') },
                        { id: 'it', value: _('it') },
                        { id: 'fr', value: _('fr') },
                        { id: 'en', value: _('en') },
                    ],
                },
                {
                    id: 'profile',
                    icon: 'mdi mdi-account',
                    value: username,
                    config: {
                        on: {
                            onItemClick: function (id) {
                                webix.message('Selected: ' + _(id));
                            },
                        },
                    },
                    submenu: [
                        { id: 'myprofile', value: _('myprofile'), icon: 'mdi mdi-account', href: '#!/top/myprofile' },
                        {
                            id: 'mybookings',
                            value: _('mybookings'),
                            icon: 'mdi mdi-account',
                            href: '#!/top/mybookings',
                        },
                    ],
                },

                {
                    id: 'credits',
                    icon: 'mdi mdi-currency-usd',
                    value: 40,
                    config: {
                        on: {
                            onItemClick: function (id) {
                                webix.message('Selected: ' + _(id));
                            },
                        },
                    },
                },
                {
                    id: 'alarm',
                    icon: 'mdi mdi-bell',
                    value: '',
                    badge: 3,
                    config: {
                        on: {
                            onclick: function (id) {
                                webix.message('Selected: ' + _(id));
                            },
                        },
                    },
                },
            ],
            on: {
                onItemClick: function (id) {
                    webix.message('Menu click: ' + id);
                    if (id == 'alarm') {
                        alarmPopup.show();
                    }
                },
            },
        };

        var alarmPopup = webix.ui({
            view: 'popup',
            localId: 'alarmPopup',
            position: 'center',
            body: {
                view: 'list',
                data: [
                    { id: 1, value: 'Alarm 1' },
                    { id: 2, value: 'Alarm 2' },
                    { id: 3, value: 'Alarm 3' },
                ],
                on: {
                    onItemClick: function (id) {
                        webix.message('Selected: ' + id);
                    },
                },
            },
        });

        return {
            cols: [menu, language],
        };
    }
    init() {
        this.use(plugins.Menu, 'menu');
    }
}
