import { JetView } from 'webix-jet';

export default class LanguageView extends JetView {
    config() {
        const { _, getLang, setLang } = this.app.getService('locale');

        var language = getLang();
        var languageView = {
            cols: [
                {
                    view: 'icon',
                    icon: 'mdi mdi-translate',
                },
                {
                    view: 'select',
                    width: 100,
                    value: language,
                    options: [
                        {
                            id: 'de',
                            value: _('de'),
                        },
                        {
                            id: 'fr',
                            value: _('fr'),
                        },
                        {
                            id: 'it',
                            value: _('it'),
                        },
                        {
                            id: 'en',
                            value: _('en'),
                        },
                    ],
                    on: {
                        onChange: function (id) {
                            webix.message('Selected: ' + _(this.getValue()));
                            setLang(id);
                        },
                    },
                },
            ],
        };

        return languageView;
    }
    init() {}
}
