import { faker } from '@faker-js/faker';

let mockdata = [];
const counter = 90;
for (let i = 0; i < counter; i++) {
    // Calc i+1 to avoid 0,;
    const number = i + 1;

    mockdata.push({
        // Calc i+1 to avoid 0,
        id: number,
        customer: faker.person.firstName() + ' ' + faker.person.lastName(),
        visum: faker.person.suffix(),
        bookingDate: faker.date.recent(),
        fromDate: faker.date.recent(),
        toDate: faker.date.recent(),
        price: faker.finance.amount(),
        parkingName: `Parkplatz ${number}`,
        agencyName: `Agentur ${number}`,
        licensePlate: faker.vehicle.vrm(),
        transactionId: faker.string.uuid(),
        payMethod: faker.finance.transactionType(),
        email: faker.internet.email(),
        cancelled: faker.datatype.boolean() ? 'Ja' : 'Nein',
    });
}

export const data = new webix.DataCollection({
    data: mockdata,
});
