//helpers/state.js
export function state(app) {
    const service = {
        getState() {
            return this.state;
        },
        setState(state) {
            this.state = state;
        },
        state: 0,
    };
    app.setService('state', service);
}
