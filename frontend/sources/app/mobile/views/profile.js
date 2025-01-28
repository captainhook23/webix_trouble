import { JetView } from 'webix-jet';

export default class ProfileView extends JetView {
    config() {
        const { _, setLang, getLang } = this.app.getService('locale');
		const {getTheme, setTheme} = this.app.getService("theme")

        const languageSwitcher = {
            view: 'select',
            id: 'languageSwitcher',
            label: _('language'),
            options: [
                { id: 'de', value: _('de') },
                { id: 'it', value: _('it') },
                { id: 'fr', value: _('fr') },
                { id: 'en', value: _('en') },
            ],
            value: getLang(), // Set the current language as the default value
            on: {
                onChange: function (newLang) {
                    setLang(newLang);
                    webix.message(_('Language switched to: ') + newLang);
                },
            },
        };

        const themeSwitcher = {
            view: 'select',
            id: 'themeSwitcher',
            label: _('Theme'),
            options: [
                { id: 'dark-default', value: _('Dark') },
                { id: 'material-default', value: _('Light') },
                {id:'flat-default', value: _('Flat')},
                {id:'compact-default', value: _('Compact')},
                {id: 'contrast-default', value: _('Contrast')},
                {id: "mini-default", value: _('Mini')},
                {id:"willow-default", value: _('Willow')},
            ],
            value: getTheme(),
            on: {
                onChange: function () {
                  const value = this.getValue();
                    setTheme(value);

                },
            },
        };

        const ui = {
            rows: [
                languageSwitcher,
                themeSwitcher,
                {},
            ],
        };

        return ui;
    }

    init() { }
}
