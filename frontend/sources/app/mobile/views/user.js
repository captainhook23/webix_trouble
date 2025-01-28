import { JetView } from 'webix-jet';
import { countItems } from '../../../helpers/datafilters/countItems';
import { proxy } from '../../../models/proxy';


export default class UsersView extends JetView {
    deleteRows(_) {
        const datatable = $$('bookings_table');
        const checkedRows = datatable.find((row) => row.check === 'on'); // Find rows with check 'on'

        if (checkedRows.length) {
            webix.confirm({
                title: _('Delete Confirmation'),
                text: _('Are you sure you want to delete the selected rows?'),
                callback: (result) => {
                    if (result) {
                        checkedRows.forEach((row) => {
                            datatable.remove(row.id); // Remove rows by ID
                        });
                        webix.message(`${checkedRows.length} ${_('rows deleted')}`);
                    }
                },
            });
        } else {
            webix.message(_('No rows selected for deletion'));
        }
    }
    addRow() {
        webix.message('Add button clicked');
        // Add new row to the datatable
        const datatable = $$('bookings_table');
        const id = datatable.add({
            name: 'New Parking',
            price: 0,
            type: 'Public',
            agency: 'Agency',
        });
        datatable.select(id);
    }
    columnConfig(_) {
        return [
            {
                id: 'check',
                header: [{ text: '' }],
                template: '{common.checkbox()}',
                checkValue: 'on',
                uncheckValue: 'off',
                adjust: 'data',
            },
            {
                id: 'id',
                sort: 'int',
                header: [{ text: _('id') }, { content: 'selectFilter' }],
                footer: { content: 'countItems', colspan: 3 },
                adjust: 'data',
                css: { 'text-align': 'center' },
            },
            {
                id: 'name',
                sort: 'string',
                header: [{ text: _('name') }, { content: 'selectFilter' }],
                adjust: 'data',
            },
            {
                id: 'price',
                sort: 'int',
                header: [{ text: _('price') }, { content: 'selectFilter' }],
                adjust: 'data',
                template: (obj) => `CHF ${obj.price}`,
                css: { 'text-align': 'left' },
            },
            {
                id: 'type',
                sort: 'string',
                header: [{ text: _('type') }, { content: 'selectFilter' }],
                adjust: 'data',
            },
            {
                id: 'charging_station',
                sort: 'string',
                header: [{ text: _('chargingStation') }, { content: 'selectFilter' }],
                adjust: 'header',
            },
            {
                id: 'locked',
                sort: 'string',
                header: [{ text: _('locked') }, { content: 'selectFilter' }],
                adjust: 'header',
            },
            {
                id: 'agency_id',
                sort: 'string',
                header: [{ text: _('agency') }, { content: 'selectFilter' }],
                adjust: 'data',
            },
            {
                id: 'image',
                sort: 'string',
                header: [{ text: _('') }],
                adjust: 'data',
                template: (
                    obj,
                ) => `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                    <img src="${obj.image}" style="width:${webix.skin.$active.listItemHeight - 5}px; height:${webix.skin.$active.listItemHeight - 5}px;">
                                     </div>`,
            },
        ];
    }

    config() {
        const { _ } = this.app.getService('locale');
        const url = 'http://192.168.1.37:8085/wp-json/ppv/v1/admin_table_booking_administration';
        webix.proxy.ppv = proxy;
        webix.ui.datafilter.countItems = countItems;

        const toolbarElementConfig = {
            view: 'button',
            type: 'icon',
            css: 'webix_danger',
        };

        const toolbar = {
            view: 'toolbar',
            id: 'toolbar',
            paddingX: -0.6,
            cols: [
                {
                    ...toolbarElementConfig,
                    id: 'delete',
                    icon: 'mdi mdi-trash-can',
                    click: () => this.deleteRows(_),
                },
                {
                    ...toolbarElementConfig,
                    id: 'add',
                    icon: 'mdi mdi-plus',
                    click: () => this.addRow(),
                },
                {
                    ...toolbarElementConfig,
                    id: 'columns',
                    icon: 'mdi mdi-table-row',
                    on: {
                        onItemClick: function () {
                            const datatable = $$('bookings_table');
                            const columns = datatable.config.columns;

                            // Create checkbox data for popup
                            const checkboxes = columns.map((col) => ({
                                id: col.id,
                                value: col.header?.[0]?.text || col.id,
                                checked: col.hidden ? 0 : 1,
                                disabled: col.id === 'id' || col.id === 'name', // Disable checkboxes for 'id' and 'name'
                            }));

                            // show the columns popup if or hide it
                            if (!$$('columnsPopup').isVisible()) {
                                $$('columnsList').parse(checkboxes);
                                $$('columnsPopup').show();
                            } else {
                                $$('columnsPopup').hide();
                            }
                        },
                    },
                },
                {
                    ...toolbarElementConfig,
                    id: 'export',
                    icon: 'mdi mdi-download',
                    on: {
                        onItemClick: function () {
                            // Show or hide the export popup
                            if ($$('exportPopup').isVisible()) {
                                $$('exportPopup').hide();
                            } else {
                                $$('exportPopup').show();
                            }
                        },
                    },
                },
                {
                    ...toolbarElementConfig,
                    id: 'toggle_filters',
                    icon: 'mdi mdi-filter',
                    click: () => {
                        const datatable = $$('bookings_table');
                        const columns = datatable.config.columns;
                        const searchbar = $$('search');

                        if (searchbar.isVisible()) {
                            // adjust the height of table header
                            searchbar.hide();
                            columns.forEach((col) => {
                                if (col.id !== 'check' && col.id !== 'image') {
                                    if (col.header[1]?.content === 'selectFilter') {
                                        col.header = [{ text: col.header[0].text }];
                                    }
                                }
                            });
                            datatable.define('headerRowHeight', 20);
                        } else {
                            datatable.define('headerRowHeight', 40);
                            searchbar.show();
                            columns.forEach((col) => {
                                if (col.id !== 'check' && col.id !== 'image') {
                                    col.header = [{ text: col.header[0].text }, { content: 'selectFilter' }];
                                }
                            });
                        }

                        datatable.refreshColumns();
                    },
                },
            ],
        };

        const searchbar = {
            id: 'search',
            view: 'search',
            width: this.app.config.size - 1,
            placeholder: _('placeholderSearch'),
            on: {
                onSearchIconClick: function () {
                    // Debounce for smoother typing experience
                    const value = this.getValue().toLowerCase(); // Get search text
                    const datatable = $$('bookings_table'); // Reference the datatable

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

                onTimedKeyPress: function () {
                    this.callEvent('onSearchIconClick');
                },
            },
        };

        const table = {
            view: 'datatable',
            id: 'bookings_table',
            select: true,
            minHeight: 100,
            datafetch: 200,
            prerender: true,
            headerRowHeight: 40,
            columns: this.columnConfig(_),
            url: 'ppv->' + url,
            on: {
                onLongTouch: function (context) {
                    const datatable = $$('bookings_table');
                    const rowId = datatable.locate(context).row; // Locate the row based on the event

                    if (rowId) {
                        datatable.select(rowId); // Select the row
                        const menu = $$('contextMenu');
                        menu.show(context); // Show the menu at the touch location
                    } else {
                        webix.message('No row found at the touch location');
                    }
                },
                onItemClick: function (id) {
                    const editWindow = $$('editWindow');
                    const form = $$('editForm');
                    const item = this.getItem(id);

                    if (!item) {
                        webix.message('No item found to edit');
                        return;
                    }

                    // Reset the form with the current item values
                    form.clear();
                    form.setValues(item);

                    // Save the ID for use during the save operation
                    form.config.itemId = id;

                    // Show the window if not already visible
                    if (!editWindow.isVisible()) {
                        editWindow.show();
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
            rows:
                [
                    toolbar, searchbar, table],
        };

        return ui;
    }

    init() {
        const { _ } = this.app.getService('locale');
        const datatable = $$('bookings_table');

        // Events to detect scroll direction
        datatable.attachEvent('onTouchStart', function (sc, cc) {
            const scroll = datatable.getScrollState();
            webix.storage.local.put('state', { scroll });
        });
        datatable.attachEvent('onTouchEnd', function (sc, cc) {
            const scroll = datatable.getScrollState();
            const lscroll = webix.storage.local.get('state').scroll;
            if (lscroll.y < scroll.y) {
                $$('arrow_up_popup').show();
            }
            else {
                $$('arrow_up_popup').hide();
            }
            webix.storage.local.put('state', { scroll });
        });

        // Load the scroll state from local storage and apply it on app resize
        this.on(this.app, 'app:resize', mode => {
            const scroll = datatable.getScrollState();
            webix.storage.local.put('state', { scroll });
            if (state) {
                const scroll = state.scroll;
                datatable.scrollTo(0, scroll.y);
                datatable.refresh();
            }
        });

        // Initialize the context menu once
        this.ui({
            view: 'contextmenu',
            id: 'contextMenu',

            data: ['Edit', 'Delete', 'Details'],
            on: {
                onItemClick: function (action) {
                    const selectedId = datatable.getSelectedId();

                    if (!selectedId) {
                        webix.message('No row selected');
                        return;
                    }

                    if (action === 'Edit') {
                        const item = datatable.getItem(selectedId.row);
                        const form = $$('editForm');
                        form.clear();
                        form.setValues(item);
                        form.config.itemId = selectedId.row;
                        $$('editWindow').show();
                    } else if (action === 'Delete') {
                        datatable.remove(selectedId.row);
                        webix.message('Row deleted');
                    } else if (action === 'Details') {
                        const item = datatable.getItem(selectedId.row);
                        webix.message(JSON.stringify(item));
                    }
                },
            },
        });

        // init the arrow up button
        this.ui({
            view: 'window',
            id: 'arrow_up_popup',
            position: function (state) {
                state.left = window.innerWidth - 44;
                state.top = window.innerHeight - 80;
                return state;
            },

            width: 45,
            height: 45,
            head: false,

            body: {
                padding: -3,
                cols: [
                    {
                        view: 'button',
                        css: 'webix_danger',
                        id: 'arrow_up_button',
                        width: 45,
                        label: '<span class="mdi mdi-arrow-up style="font-size: 40px; padding:0px !important;"></span>',
                        height: 45,
                        click: function () {
                            datatable.scrollTo(0, 0); // Scroll to the top
                            $$('arrow_up_popup').hide();
                        },
                    },]
            }
        });

        // Initialize the columns popup
        this.ui({
            view: 'popup',
            id: 'columnsPopup',
            position: function (state) {
                // Get the position of the toolbar button
                const button = $$('columns');
                const buttonPos = button.$view.getBoundingClientRect();
                state.left = buttonPos.left + 2;
                state.top = buttonPos.bottom;

                // get the max width possible between the button and the right edge of the screen
                const max = window.innerWidth - buttonPos.left - 4;
                state.width = max;
                return state;
            },
            body: {
                view: 'list',
                id: 'columnsList',
                template: (obj) => `
                    <div style="display: flex; align-items: center;">
                        <input type="checkbox" 
                               style="margin-right: 8px;" 
                               ${obj.checked ? 'checked' : ''} 
                               ${obj.disabled ? 'disabled' : ''}>
                        ${obj.value}
                    </div>
                `,
                data: this.checkboxes,
                type: {
                    height: 40,
                },
                on: {
                    onItemClick: function (id) {
                        const item = this.getItem(id);
                        if (!item.disabled) {
                            item.checked = !item.checked;
                            if (item.checked) {
                                datatable.showColumn(item.id);
                            } else {
                                datatable.hideColumn(item.id);
                            }
                            this.updateItem(id, item);
                            setState({});
                        }
                    },
                },
            },
        });

        // Initialize the export popup
        this.ui({
            view: 'popup',
            id: 'exportPopup',
            width: 200,
            position: function (state) {
                // Get the position of the toolbar button
                const button = $$('export');
                const buttonPos = button.$view.getBoundingClientRect();
                state.left = buttonPos.left + 2;
                state.top = buttonPos.bottom;

                // get the max width possible between the button and the right edge of the screen
                const max = window.innerWidth - buttonPos.left - 4;
                state.width = max;
                return state;
            },
            body: {
                view: 'list',
                id: 'exportList',
                template: '#value#',
                data: [
                    { id: 'png', value: 'Export as PNG' },
                    { id: 'excel', value: 'Export as Excel' },
                    { id: 'csv', value: 'Export as CSV' },
                    { id: 'json', value: 'Export as JSON' },
                ],
                autoheight: true,
                select: true,
                on: {
                    onItemClick: function (id) {
                        const data = datatable.serialize(); // Serialize datatable data

                        switch (id) {
                            case 'png':
                                webix.toPNG(datatable, { download: true });
                                break;
                            case 'excel':
                                webix.toExcel(datatable, { filename: 'bookings_table' });
                                break;
                            case 'csv':
                                webix.toCSV(datatable, { filename: 'bookings_table.csv' });
                                break;
                            case 'json':
                                const json = JSON.stringify(data, null, 2);
                                webix.html.download(json, 'bookings_table.json');
                                break;
                            default:
                                webix.message('Unknown export type');
                        }

                        // Close the popup after selection
                        $$('exportPopup').hide();
                    },
                },
            },
        });

        // Initialize the edit window
        this.ui({
            view: 'window',
            id: 'editWindow',
            head: 'edit',
            width: window.innerWidth,
            position: function (state) {
                // Center the window
                const centerY = window.innerHeight / 2 - state.height / 2;
                state.top = centerY;
                state.left = 2;
                state.width = window.innerWidth - 4;

                return state;
            },
            body: {
                view: 'form',
                id: 'editForm',
                elements: [
                    { view: 'text', label: _('name'), name: 'name' },
                    { view: 'text', label: _('price'), name: 'price' },
                    { view: 'text', label: _('type'), name: 'type' },
                    {
                        view: 'text',
                        label: _('agency'),
                        name: 'agency_id',
                    },
                    {
                        cols: [
                            {
                                view: 'button',
                                value: _('save'),
                                click: () => {
                                    const form = $$('editForm');
                                    const values = form.getValues();
                                    const id = form.config.itemId;
                                    datatable.updateItem(id, values);

                                    $$('editWindow').hide();
                                },
                            },
                            {
                                view: 'button',
                                value: _('cancel'),
                                click: () => {
                                    $$('editForm').clear();
                                    $$('editWindow').hide();
                                },
                            },
                        ],
                    },
                ],
            },
        });
    }
}
