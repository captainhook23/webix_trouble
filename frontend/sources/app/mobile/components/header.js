import { JetView } from 'webix-jet';

export default class HeaderView extends JetView {


    config() {
        const user = this.app.getService('user').getUser();
        console.log('%c User Info ', 'background: #7bf542; color: black;', user);

        const username = `${user.firstname} ${user.lastname.charAt(0)}.`;
        // Username + first letter of lastname

        const userName =   user.firstname + ' ' + user.lastname.charAt(0) + '.';

        var suva = {
            template: "<p style='font-size: 8px; font-weight: bold;'>SUVA</p>",
        };


        const header = {
            height: 20,
            paddingX: 1.5,
            cols: [
                {
                    view: 'label',
                    label: 'SUVA',
                    template: function (obj) {
                        return  `<div style="display: flex; align-items: center; font-size: 18px; font-weight: bold;">${obj.label}</div>`;
                    },
                    align: 'left',
                },
               
               
               
                {
                    view: 'label',
                    label: this.app.config.name + ' - ' + this.app.config.version,
                    align: 'center',
                },
                {
                    view: 'label',
                    label: username,
                    align: 'right',
                },
             
            ],
        };

        const ui = header;

        return ui;
    }

    init() {

    }
}
