// import JetApp and plugins
import { JetApp, EmptyRouter, HashRouter, plugins } from 'webix-jet';

import { accessControl } from '../../helpers/accessControl';

// locales, optional
const locales = import.meta.glob('../../locales/*.js');
const words = (name) => locales[`../../locales/${name}.js`]().then((x) => x.default);

export default class BaseApp extends JetApp {
    constructor(config) {
        const defaults = {
            id: import.meta.env.VITE_APPNAME,
            name: import.meta.env.VITE_APPNAME,
            email: import.meta.env.VITE_EMAIL,
            teamname: import.meta.env.VITE_TEAMNAME,
            version: import.meta.env.VITE_VERSION,
            router: import.meta.env.VITE_BUILD_AS_MODULE ? EmptyRouter : HashRouter,
            debug: !import.meta.env.PROD,
            OS: webix.env.OS,
            browserEngine: webix.env.engine,
            start: '/top/start',
        };

        super({ ...defaults, ...config });


        

        this.attachEvent("app:error:resolve", function(view, role) {
            webix.delay(() => this.show("/top/error"));
        });
        
        // theme plugin
        this.use(plugins.Theme);

        // locales plugin
        this.use(plugins.Locale, {
            lang: 'de',
            webix: {
                de: 'de-DE',
                en: 'en-US',
                it: 'it-IT',
                fr: 'fr-FR',
            },
            path: words,
        });

        // user plugin
        this.use(plugins.User, {
            ping: 1000 * 60,

            model: {
                status: function () {
                    // Returning a Promise with mock data
                    return new Promise((resolve) => {
                        resolve({
                            firstname: 'Sven',
                            lastname: 'Lussmann',
                            role: 'ppv_admin',
                            email: 'sven.lussmann@gmail.com',
                        });
                    });
                },
                login: function () {
                    // Simulating a successful login
                    return Promise.resolve(true);
                },
                logout: function () {
                    // Simulating a logout failure
                    return Promise.resolve(false);
                },
            },
        });

        this.use(accessControl);


        
    }

    
}
