import { faker } from '@faker-js/faker';

let mockdata = [];
const counter = 1000;
for (let i = 0; i < counter; i++) {
    // Calc i+1 to avoid 0,;
    const number = i + 1;

    mockdata.push({
        // Calc i+1 to avoid 0,
        id: number,
        name: `Agentur ${number}`,
        street: `Strasse ${number}`,
        zip: `PLZ ${number}`,
        city: `Ort ${number}`,
        phone: `Telefon ${number}`,
        zahlsApi: `Agentur${number}`,
        zahlsToken: `Token${number}`,
    });
}

export const data = new webix.DataCollection({
    data: mockdata,
});
