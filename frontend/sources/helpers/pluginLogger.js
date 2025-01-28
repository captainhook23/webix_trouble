//helpers/state.js
export function logger(app) {
    const service = {
        log(message) {
            console.log(message);
        },
        error(message) {
            console.error(message);
        },
        warn(message) {
            console.warn(message);
        },
    };
    app.setService('logger', service);
}
