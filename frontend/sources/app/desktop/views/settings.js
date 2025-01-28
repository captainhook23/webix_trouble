import { JetView } from 'webix-jet';

export default class SettingsView extends JetView {
    config() {
        const { _ } = this.app.getService('locale');
        const logger = this.app.getService('logger');

        logger.log('Settings view initialized');
        var agency = {
            view: 'form',
            id: 'agency',
            elements: [
                { view: 'text', label: 'Agency Name', labelWidth: 150, name: 'agencyName' },
                { view: 'text', label: 'Agency Address', labelWidth: 150, name: 'agencyAddress' },
                { view: 'text', label: 'Agency Phone', labelWidth: 150, name: 'agencyPhone' },
                { view: 'text', label: 'Agency Email', labelWidth: 150, name: 'agencyEmail' },
                { view: 'text', label: 'Agency Website', labelWidth: 150, name: 'agencyWebsite' },
            ],
        };

        var cancellation = {
            view: 'form',
            id: 'cancellation',
            elements: [
                { view: 'checkbox', label: 'Stornierung erlaubt', labelWidth: 150, name: 'cancellationAllowed' },
                {
                    view: 'richselect',
                    label: 'Erlaubte Zeiten',
                    labelWidth: 150,
                    name: 'allowedTimes',
                    options: [
                        { id: '24_hours', value: '24 Stunden vorher' },
                        { id: '12_hours', value: '12 Stunden vorher' },
                        { id: '6_hours', value: '6 Stunden vorher' },
                        { id: 'none', value: 'Keine Stornierung erlaubt' },
                    ],
                },
            ],
        };

        var termsInfo = {
            view: 'form',
            id: 'termsInfo',
            elements: [
                {
                    view: 'textarea',
                    label: 'AGBs und Informationen',
                    labelWidth: 150,
                    height: 100,
                    name: 'termsAndInfo',
                },
            ],
        };

        var paymentMethods = {
            view: 'form',
            id: 'paymentMethods',
            elements: [
                {
                    view: 'multiselect',
                    label: 'Zahlungsmittel',
                    labelWidth: 150,
                    name: 'paymentMethods',
                    options: [
                        { id: 'credit_card', value: 'Kreditkarte' },
                        { id: 'paypal', value: 'PayPal' },
                        { id: 'bank_transfer', value: 'Bankuberweisung' },
                        { id: 'cash', value: 'Barzahlung' },
                    ],
                },
            ],
        };

        var bookingTimes = {
            view: 'form',
            id: 'bookingTimes',
            elements: [
                {
                    view: 'daterangepicker',
                    label: 'Buchungszeitraum (Mo-So)',
                    labelWidth: 150,
                    name: 'bookingRange',
                },
                {
                    view: 'timeboard',
                    label: 'Gesperrte Zeiten',
                    labelWidth: 150,
                    name: 'blockedTimes',
                },
                {
                    view: 'checkbox',
                    label: 'Halbtags / Stundlich',
                    labelWidth: 150,
                    name: 'timeSlots',
                },
                {
                    view: 'counter',
                    label: 'Preis pro Stunde',
                    labelWidth: 150,
                    name: 'pricePerHour',
                    min: 0,
                    step: 5,
                },
                {
                    view: 'checkbox',
                    label: 'Erinnerungen aktivieren',
                    labelWidth: 200,
                    name: 'remindersEnabled',
                },
            ],
        };

        return {
            view: 'scrollview',
            scroll: 'y',
            body: {
                rows: [
                    { template: 'Agency Settings', type: 'section', autoheight: true },
                    agency,
                    { template: 'Cancellation Settings', type: 'section', autoheight: true },
                    cancellation,
                    { template: 'Terms and Information', type: 'section', autoheight: true },
                    termsInfo,
                    { template: 'Payment Methods', type: 'section', autoheight: true },
                    paymentMethods,
                    { template: 'Booking Times', type: 'section', autoheight: true },
                    bookingTimes,
                    { view: 'button', value: 'Save', css: 'webix_primary' },
                ],
            },
        };
    }

    init() {
        // Additional initialization logic if needed
    }
}
