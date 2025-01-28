import {name, rules, template } from 'webix';
import { JetView } from 'webix-jet';
import { data } from '../../../models/parkings';

export default class NewBookingView extends JetView {
    config() {
       

        const agency = {
            view: 'richselect',
            id: 'agency',
            label: 'Agentur',
            labelWidth: 100,
            name: 'agency',
            options: [
                { id: 1, value: 'Bern' },
                { id: 2, value: 'Freiburg' },
                { id: 3, value: 'Lausanne' },
            ],
        };

        const saveButton = {
            view: 'button',
            value: 'Suchen',
            css: 'webix_primary',
            click: () => {
                const form = this.getRoot().queryView({ view: 'form' });
                if (form.validate()) {
                    const data = form.getValues();
                    webix.message(JSON.stringify(data));
                }
            },
        };

        // custom input for datepicker just label, input field and icon in input field
        const startdate = {
            view: 'text',
            id: 'startDate',
            label: 'Startdatum',
            icon: 'mdi mdi-calendar',
            labelWidth: 100,
            name: 'startdate',
            on: {
                onItemclick: function () {
                    webix.message('Clicked on the calendar icon');
                const calendarPopup = $$('calendarPopup');
                if (calendarPopup.isVisible()) {
                    calendarPopup.hide();
                } else{

                    calendarPopup.show();
                }
                },
            },
        };

       


        const chargingStation = {
            view: 'checkbox',
            labelWidth: 100,
            id: 'chargingStation',
            name: 'chargingStation',
            label: 'Ladestation',
        };

        const arrowUpButton = {
            view: 'button',
            id: 'arrowUpButton',
            value: '↓',
            css: 'webix_primary',
            click: () => {
                const filterForm = $$('filterForm');
                const arrowUpButton = $$('arrowUpButton');

                if (filterForm.isVisible()) {
                    filterForm.hide();
                    // change the button value to up arrow
                    arrowUpButton.setValue('↑');
                } else {
                    filterForm.show();
                    // change the button value to down arrow
                    arrowUpButton.setValue('↓');
                }
            },
        }

        const tabbar = {
            view: 'tabview',
            cells: [
                {
                    id: 'parking',
                    header: 'Auswahl Parkplatz',
                    body: {},
    
                },
                {
                    id: 'charging',
                    header: 'Üperprüfen',
                    body: {},
                },
                {
                    id: 'payment',
                    header: 'Zahlung',
                    body: {},
                },
                {
                    id: 'confirmation',
                    header: 'Bestätigung',
                    body: {},
                }
            ]
        }

        const filter = {
            view: 'form',
            id: 'filterForm',
            // Margin bottom
            margin: 10,
            
            elements: [
                agency,
                startdate,
                {
                    cols: [chargingStation, saveButton],
                },
            ],
            rules: {
                agency: rules.isNotEmpty,
                startdate: rules.isNotEmpty,
            },
        };

        const parkingMockList = {
            cols: [
                {
                    view: 'list',
                    select: true,
                    id: 'parkingList',
                    css: 'parking_list',
                    template: (obj) => `
    <div class="parking_item" style="display: flex; align-items: center; gap: 15px;">
        <div class="parking_image" style="flex:0 auto;">
            <img src="sources/assets/KungFuScharck.jpg" style="width: 100px; height: 100px; object-fit: cover;">
        </div>
        <div class="parking_details" >
            <div class="parking_title" style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">${obj.name}</div>
            <div class="parking_agency" style="margin-bottom: 5px;">Agency: ${obj.agency}</div>
            <div class="parking_agency" style="margin-bottom: 5px;">City: ${obj.city}</div>

            <div class="parking_price" style="margin-bottom: 5px;">Price: CHF ${obj.price}</div>
            <div class="parking_availability">${obj.type}</div>
        </div>
    </div>
`,

                    type: {
                        height: 'auto',
                    },
                    data: data,
                    on: {
                        onItemClick: function (id) {
                            const item = this.getItem(id);
                            webix.message(`Selected: ${item.name}`);
                        },
                    },
                },
            ],
        };

        const ui = {
            rows: [tabbar, parkingMockList, filter,   
                {
                    padding:1,
                    cols: [
                        arrowUpButton,
                    ],
                },
            ],
        };
        return ui;
    }
    init() {

        this.ui({
            view: 'popup',
            id: 'calendarPopup',
            // Positioning the popup
            position: function (state) {
                const input = $$('startDate');
                const inputPos = input.$view.getBoundingClientRect();
        
                state.left = inputPos.left;
                state.top = inputPos.bottom - 350;
                state.width = inputPos.width;
        
                console.log('Input: ', input);
                return state;
            },
            body: {
                view: 'calendar',
                id: 'calendar',
                events: webix.Date.isHoliday,
                on: {
                    onChange: function () {
                        // Format the date as dd.mm.yyyy
                        const obj = this.getSelectedDate();
                        const formatter = webix.Date.dateToStr('%d.%m.%Y'); // Create a formatter
                        const formattedDate = formatter(obj); // Format the date
        
                        // Set the formatted date in the input field
                        $$('startDate').setValue(formattedDate);
                    },
                },
            },
        });
        
        
    }
}
