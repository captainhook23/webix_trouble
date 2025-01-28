import { faker } from '@faker-js/faker';

let mockdata = [];
const counter = 500;
for (let i = 0; i < counter; i++) {
    // Calc i+1 to avoid 0,;
    const number = i + 1;
    mockdata.push({
        // Calc i+1 to avoid 0,
        id: number,
        name: `Parkplatz ${number}`,
        price: faker.number.int({ min: 5, max: 10, multipleOf: 5 }),
        type: i % 2 ? 'Aussenparkplatz' : 'Innenparkplatz',
        chargingStation: faker.datatype.boolean() ? 'Ja' : 'Nein',
        locked: faker.datatype.boolean() ? 'Ja' : 'Nein',
        agency: `Agentur ${number}`,
        image: faker.image.avatar(),
    });
}

export const data = new webix.DataCollection({
    start: 10,
    data: mockdata,
});
