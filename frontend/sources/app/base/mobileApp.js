// import BaseApp
import BaseApp from './baseApp';

export default class MobileApp extends BaseApp {
    constructor(config) {
        // dynamic import of views
        const modules = import.meta.glob('../mobile/views/**/*.js');
        const views = (name) => modules[`../mobile/views/${name}.js`]().then((x) => x.default);

        const defaults = {
            // set custom view loader, mandatory

            views,
        };

        super({ ...defaults, ...config });

        

       
    }
}
