import { faker } from '@faker-js/faker';

let mockdata = [];
const counter = 95;
for (let i = 0; i < counter; i++) {
    // Calc i+1 to avoid 0,;
    const number = i + 1;

    mockdata.push({
        // Calc i+1 to avoid 0,
        id: number,
        gender: faker.person.gender(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        visum: faker.person.suffix(),
        email: faker.internet.email(),
        agency: `Agentur ${number}`,
        licensePlate: faker.vehicle.vrm(),
        role: faker.person.jobTitle(),
        credits: faker.finance.amount(),
        lastLogin: faker.date.recent(),
        registerDate: faker.date.recent(),
    });
}

export const data = new webix.DataCollection({
    data: mockdata,
});
