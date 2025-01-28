import { template } from 'webix';
import { JetView } from 'webix-jet';
import { data } from '../../../models/bookings';
import { countItems } from '../../../helpers/datafilters/countItems';

export default class ReservationsView extends JetView {
    config() {
        console.log(webix.skin.material);
        webix.Touch.longTouchDelay = 100;
        webix.ui.datafilter.countItems = countItems;

        const toolbar = {
            view: 'toolbar',
            elements: [
                { view: 'button', label: 'Add', type: 'icon', icon: 'wxi-plus', width: 100 },
                { view: 'button', label: 'Edit', type: 'icon', icon: 'wxi-pencil', width: 100 },
                { view: 'button', label: 'Delete', type: 'icon', icon: 'wxi-trash', width: 100 },
                { view: 'button', label: 'Refresh', type: 'icon', icon: 'wxi-sync', width: 100 },
                { view: 'button', label: 'Export', type: 'icon', icon: 'wxi-download', width: 100 },
                { view: 'button', label: 'Print', type: 'icon', icon: 'wxi-print', width: 100 },
                { view: 'button', label: 'Settings', type: 'icon', icon: 'wxi-settings', width: 100 },
                { view: 'button', label: 'Help', type: 'icon', icon: 'wxi-question', width: 100 },
            ],
        };

        const searchbar = {
            view: 'search',
            placeholder: 'Search...',
            on: {
                onSearchIconClick: function () {
                    // Debounce for smoother typing experience
                    const value = this.getValue().toLowerCase(); // Get search text
                    const datatable = $$('bookings'); // Reference the datatable

                    datatable.filter((obj) => {
                        // Loop through all object keys (columns)
                        for (let key in obj) {
                            if (obj[key] !== null && obj[key] !== undefined) {
                                const cellValue = obj[key].toString().toLowerCase();
                                if (cellValue.indexOf(value) !== -1) {
                                    return true; // Match found
                                }
                            }
                        }
                        return false; // No match
                    });
                },
                onChange: function () {
                    this.callEvent('onSearchIconClick');
                },
            },
        };

        const table = {
            view: 'datatable',
            id: 'bookings',
            select: true,
            footer: true,
            autoWidth: true,
            columns: [
                {
                    id: 'id',
                    sort: 'int',
                    header: [{ text: 'ID' }, { content: 'selectFilter' }],
                    footer: { content: 'countItems', colspan: 3 },
                    adjust: 'data',
                },

                {
                    id: 'customer',
                    sort: 'string',
                    header: [{ text: 'Kunde' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                { id: 'visum', sort: 'int', width: 150, header: [{ text: 'Visum' }, { content: 'selectFilter' }] },
                {
                    id: 'bookingDate',
                    sort: 'string',
                    header: [{ text: 'bookingDate' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'fromDate',
                    sort: 'string',
                    header: [{ text: 'fromDate' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'toDate',
                    sort: 'string',
                    header: [{ text: 'toDate' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'price',
                    sort: 'string',
                    header: [{ text: 'price' }, { content: 'selectFilter' }],
                    adjust: 'header',
                },
                {
                    id: 'parkingName',
                    sort: 'string',
                    header: [{ text: 'parkingName' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'agencyName',
                    sort: 'string',
                    header: [{ text: 'agencyName' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'licensePlate',
                    sort: 'string',
                    header: [{ text: 'licensePlate' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'transactionId',
                    sort: 'string',
                    header: [{ text: 'transactionId' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'payMethod',
                    sort: 'string',
                    header: [{ text: 'payMethod' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'email',
                    sort: 'string',
                    header: [{ text: 'email' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'cancelled',
                    sort: 'string',
                    header: [{ text: 'cancelled' }, { content: 'selectFilter' }],
                    adjust: 'data',
                },
                {
                    id: 'actions',
                    width: 100,
                    header: [{ text: '' }],
                    template: "<span class='webix_icon wxi-dots'></span>", // 3-dot menu icon
                },
            ],
            data: data,
            on: {
                // Handle long press event
                onLongTouch: function (context) {
                    const datatable = $$('bookings');
                    const rowId = datatable.locate(context).row; // Locate the row based on the event

                    if (rowId) {
                        datatable.select(rowId); // Select the row
                        const menu = $$('contextMenu');
                        menu.show(context); // Show the menu at the touch location
                    } else {
                        webix.message('No row found at the touch location');
                    }
                },
                // Handle click event on the 3-dot menu icon
                onItemClick: function (id, e, node) {
                    if (id.column === 'actions') {
                        webix.message(`3-dot menu clicked on row: ${id.row}`);
                        const menu = $$('contextMenu');
                        // get the icon 3-dot icon
                        const icon = node.querySelector('.wxi-dots');
                        menu.show(icon); // Show the menu at the 3-dot icon
                    }
                },
                onBeforeLoad: function () {
                    this.showOverlay('Loading...');
                },
                onAfterLoad: function () {
                    if (!this.count()) this.showOverlay('No data found :-(');
                    else this.hideOverlay();
                },
            },
        };

        const ui = {
            rows: [toolbar, searchbar, table],
        };

        return ui;
    }

    init() {
        // Initialize the context menu once
        this.ui({
            view: 'contextmenu',
            id: 'contextMenu',

            data: ['Edit', 'Delete', 'Details'],
            on: {
                onItemClick: function (action) {
                    const datatable = $$('bookings');
                    const selectedId = datatable.getSelectedId();

                    if (!selectedId) {
                        webix.message('No row selected');
                        return;
                    }

                    if (action === 'Edit') {
                        webix.message(`Editing row: ${selectedId.row}`);
                    } else if (action === 'Delete') {
                        datatable.remove(selectedId.row);
                        webix.message('Row deleted');
                    } else if (action === 'Details') {
                        const item = datatable.getItem(selectedId.row);
                        webix.message(JSON.stringify(item));
                    }
                },
            },
        }).attachTo($$('bookings'));
    }
}
