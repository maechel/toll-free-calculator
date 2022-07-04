import { randomBool, getRandomTollFreeVehicleType, generateRandomHex } from './random.mjs';
import { faker } from '@faker-js/faker/locale/sv';

const NUM_VEHICLES_DEFAULT = 10;
const PERCENT_TOLL_FREE_VEHICLES = .3;

/**
 * Creates numberOfVehicles vehicles with id and type ("Car" or toll-free vehicle).
 * @param {number} [numberOfVehicles=100] numberOfVehicles number of vehicles to be created
 * @param {number} [percentTollFreeVehicles=0.3] approx. percentage of toll-free vehicles [0..1]
 */
export const vehicleFactory = (numberOfVehicles = NUM_VEHICLES_DEFAULT, percentTollFreeVehicles = PERCENT_TOLL_FREE_VEHICLES) => {
    const vehicles = [];

    for (let i = 0; i < numberOfVehicles; i++) {
        const regNr = generateRandomHex();
        const isTollFree = randomBool(percentTollFreeVehicles);
        const type = isTollFree
            ? getRandomTollFreeVehicleType()
            : 'Car';

        vehicles.push({ regNr, type, model: faker.vehicle.vehicle(), owner: null });
    }

    return vehicles;
};