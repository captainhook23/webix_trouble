// import BaseApp
import BaseApp from './baseApp';

export default class DesktopApp extends BaseApp {
    constructor(config) {
        // Import here to ensure no conflicts with the main app

        // dynamic import of views
        const modules = import.meta.glob('../desktop/views/**/*.js');
        const views = (name) => modules[`../desktop/views/${name}.js`]().then((x) => x.default);

        const defaults = {
            // set custom view loader, mandatory
            views,
        };

        super({ ...defaults, ...config });
    }
}
