import { JetView } from 'webix-jet';

export default class DashboardView extends JetView {
    config() {
        const today = webix.Date.dateToStr('%Y-%m-%d')(new Date());
        const tomorrow = webix.Date.dateToStr('%Y-%m-%d')(webix.Date.add(new Date(), 1, 'day'));
        const later = webix.Date.dateToStr('%Y-%m-%d')(webix.Date.add(new Date(), 2, 'day'));
        const { _ } = this.app.getService('locale');
        var tableActiveBookings = {
            view: 'datatable',
            id: 'tableActiveBookings',
            localId: 'tableActiveBookings',
            columns: [
                { id: 'id', header: 'ID', width: 50 },
                { id: 'name', header: 'Name', width: 200 },
                { id: 'date', header: [_('date'), { content: 'selectFilter' }], width: 200 },
                { id: 'time', header: 'Time', width: 200 },
                { id: 'status', header: 'Status', width: 200 },
            ],
            data: [
                { id: 1, name: 'John Doe', date: today, time: '12:00', status: 'Active' },
                { id: 2, name: 'Sven Lussmann', date: tomorrow, time: '14:00', status: 'Active' },
                { id: 3, name: 'John Doe', date: today, time: '12:00', status: 'Active' },
                { id: 4, name: 'Sven Lussmann', date: tomorrow, time: '14:00', status: 'Active' },
                { id: 5, name: 'John Doe', date: today, time: '12:00', status: 'Active' },
                { id: 6, name: 'Sven Lussmann', date: tomorrow, time: '14:00', status: 'Active' },
                { id: 7, name: 'John Doe', date: today, time: '12:00', status: 'Active' },
                { id: 8, name: 'Sven Lussmann', date: later, time: '14:00', status: 'Active' },
                { id: 9, name: 'John Doe', date: later, time: '12:00', status: 'Active' },
                { id: 10, name: 'Sven Lussmann', date: later, time: '14:00', status: 'Active' },
                { id: 11, name: 'John Doe', date: later, time: '12:00', status: 'Active' },
                { id: 12, name: 'Sven Lussmann', date: later, time: '14:00', status: 'Active' },
            ],
            on: {
                onAfterFilter: function () {
                    console.log('filter');
                    webix.$$('gage').setValue(this.count());
                },
            },
        };
        var gage = {
            view: 'gage',
            id: 'gage',
            type: 'circle',
            value: 0,
            label: 'Active Bookings',
            minRange: 0,
            maxRange: 8,
            width: 200,
        };

        var calendarpicker = {
            view: 'calendar',
            events: webix.Date.isHoliday,
            weekHeader: true,
            on: {
                onChange: function (date) {
                    // Convert the selected date to 'YYYY-MM-DD' format
                    var dateStr = webix.Date.dateToStr('%Y-%m-%d')(new Date(date));

                    // Filter the table by the selected date
                    webix.$$('tableActiveBookings').getFilter('date').value = dateStr;
                    webix.$$('tableActiveBookings').filterByAll();

                    // Optional: Display a message for debugging or user feedback
                    webix.message('Filtered by date: ' + dateStr);
                },
            },
        };

        return {
            rows: [
                {
                    cols: [
                        {
                            rows: [
                                {
                                    view: 'toolbar',
                                    elements: [{ view: 'label', label: 'Dashboard' }],
                                },
                                tableActiveBookings,
                            ],
                        },
                        gage,
                        calendarpicker,
                    ],
                },
                {
                    template: 'Weitere Informationen',
                },
            ],
        };
    }

    urlChange() {
        const user = this.app.getService('user').getUser();

        if (user.role !== 'ppv_admin') {
            // Redirect unauthorized users to home or an error page
            webix.message('WHOOPS, not the right permissions');
            this.app.show('/top/unauthorized');
        }
    }

    init() {
        const today = webix.Date.dateToStr('%Y-%m-%d')(new Date());

        //Instead of filtering the table, please set the filter value into the select filter
        this.$$('tableActiveBookings').getFilter('date').value = today;
        this.$$('tableActiveBookings').filterByAll();
        this.$$('gage').setValue(this.$$('tableActiveBookings').count());
    }
}
