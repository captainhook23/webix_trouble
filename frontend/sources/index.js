import DesktopApp from './app/base/desktopApp';
import MobileApp from './app/base/mobileApp';

webix.ready(() => {
    let app;

    // INIT THE APP
    if (webix.env.mobile) {
        // INIT THE MOBILE APP
        webix.ui.fullScreen();
        console.log('%c MobileApp ', 'background:#f56042; color:black;');
        app = new MobileApp();
    } else {
        // INIT THE DESKTOP APP
        console.log('%c DesktopApp ', 'background:#f56042; color:black;');
        app = new DesktopApp();
    }

    const getSize = () => window.innerWidth;
    app.config.size = getSize();

    webix.event(window, 'resize', function () {
        const newSize = getSize();
        if (newSize != app.config.size) {
            app.config.size = newSize;
            app.callEvent('app:resize', [newSize]);
        }
    });
   
    app.render();


    // CONSOLE LOGGING
    console.log(
        '%c Webix Ready  %c PPV Ready ',
        'background: #c567c7; color: black;',
        'background:#1CA1C1; color: black;',
    );
    console.log(
        '%c ScreenWidth %c ' + window.screen.width + ' %c ScreenHeight %c ' + window.screen.height,
        'background:#f5aa42; color:black;',
        '',
        'background:#f5aa42; color:black;',
        '',
    );
    console.log('%c Mobile? ', 'background:#f56042; color:black;', webix.env.mobile);
    console.log('%c HTTPS? ', 'background:#f56042; color:black;', webix.env.https);
    console.log(
        '%c Webix Initialized  %c PPV Initialized ',
        'background: #c567c7; color: black;',
        'background:#1CA1C1; color: black;',
    );
});
