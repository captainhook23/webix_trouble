import { JetView } from 'webix-jet';
import { data } from '../../../models/parkings';
import { countItems } from '../../../helpers/datafilters/countItems';
import { CustomScroll, template } from 'webix';

export default class ParkingsView extends JetView {
    config() {
        webix.Touch.enable();

        console.log(webix.skin.material);
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
                    const datatable = $$('parkings'); // Reference the datatable

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
            id: 'parkings',
            select: true,
            footer: true,
            fetch: 20,
            columns: [
                {
                    id: 'id',
                    sort: 'int',
                    header: [{ text: 'ID' }, { content: 'selectFilter' }],
                    footer: { content: 'countItems', colspan: 3 },
                    adjust: 'data',
                    fillspace: true,
                },

                {
                    id: 'name',
                    sort: 'string',
                    header: [{ text: 'Name' }, { content: 'selectFilter' }],
                    adjust: 'data',
                    fillspace: true,
                },
                {
                    id: 'price',
                    sort: 'int',
                    width: 150,
                    header: [{ text: 'Price' }, { content: 'selectFilter' }],
                    fillspace: true,
                },
                {
                    id: 'type',
                    sort: 'string',
                    header: [{ text: 'Type' }, { content: 'selectFilter' }],
                    adjust: 'data',
                    fillspace: true,
                },
                {
                    id: 'chargingStation',
                    sort: 'string',
                    header: [{ text: 'Charging Station' }, { content: 'selectFilter' }],
                    adjust: 'header',
                    fillspace: true,
                },
                {
                    id: 'locked',
                    sort: 'string',
                    header: [{ text: 'Locked' }, { content: 'selectFilter' }],
                    adjust: 'header',
                    fillspace: true,
                },
                {
                    id: 'agency',
                    sort: 'string',
                    header: [{ text: 'Agency' }, { content: 'selectFilter' }],
                    adjust: 'data',
                    fillspace: true,
                },
                {
                    id: 'image',
                    sort: 'string',
                    header: [{ text: 'Image' }, { content: 'selectFilter' }],
                    adjust: 'data',
                    fillspace: true,

                    template: template('<img src="#image#" style="width:100px;height:100px;">'),
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
                    const datatable = $$('parkings');
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
        }).attachTo($$('parkings'));
    }
}
