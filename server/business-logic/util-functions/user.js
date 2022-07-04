import { faker } from '@faker-js/faker/locale/sv';
import { TollFreeVehicles } from './constants.mjs';

export const generateFakeVehicleOwner = (type) => {
    if(type === TollFreeVehicles.EMERGENCY || type === TollFreeVehicles.MILITARY) {
        return {
            pnr: faker.datatype.uuid(),
            firstName: 'Regeringskansliet',
            lastName: '',
            phone: '08-001001',
            address: {
                city: 'Stockholm',
                street: 'Rosenbad',
            }
        }
    }

    return {
        pnr: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number(),
        address: {
            city: faker.address.city(),
            street: faker.address.streetAddress(),
        }
    }
};