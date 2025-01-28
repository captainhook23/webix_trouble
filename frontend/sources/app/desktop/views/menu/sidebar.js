import { JetView, plugins } from 'webix-jet';

export default class SidebarView extends JetView {
    config() {
        const { _ } = this.app.getService('locale');
        const userrole = this.app.getService('user').getUser().role;

        var sidebar = {
            view: 'sidebar',
            id: 'sidebar',
            localId: 'sidebar',
            css: 'webix_dark',
            data: [
                {
                    id: 'newBooking',
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
                onAfterSelect: function (id) {
                    webix.message('Selected: ' + this.getItem(id).value);
                },
            },
        };

        if (userrole == 'ppv_admin') {
            sidebar.data.push({
                id: 'administration',
                icon: 'mdi mdi-table',
                value: _('administration'),
                data: [
                    { id: 'dashboard', value: _('dashboard'), icon: 'mdi mdi-view-dashboard' },
                    { id: 'settings', value: _('settings'), icon: 'mdi mdi-cog' },
                    { id: 'parkings', value: _('parkings'), icon: 'mdi mdi-car' },
                    { id: 'user', value: _('user'), icon: 'mdi mdi-account' },
                ],
            });
        }

        return sidebar;
    }
    init() {
        // use menu plugin
        this.use(plugins.Menu, 'sidebar');
    }
}
