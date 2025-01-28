//helpers/state.js
export function accessControl(app) {
    const service = {
        checkAccess(view, role) {
            if (role !== 'ppv_admin') {
                view.app.callEvent('app:error:resolve',[view ,role] );
            }
        }
    };  

    app.setService('accessControl', service);
}
