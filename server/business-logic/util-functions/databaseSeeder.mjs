import chalk from 'chalk';
import { usersDb, vehiclesDb, passagesDb } from '../../../database/index.mjs';
import { vehicleFactory } from './vehicleFactory.mjs';
import { asyncForEach } from './async.mjs';
import { getDatesBetween, getTimeEntries } from './dates.mjs';
import { generateFakeVehicleOwner } from './user.js';

const resetDatabases = async () => {
    usersDb.data = { users: [] };
    await usersDb.write();

    vehiclesDb.data = { vehicles: [] };
    await vehiclesDb.write();

    passagesDb.data = { passages: [] };
    await passagesDb.write();
};

export const seedDatabase = async (startDate, endDate, startHour, endHour, numberOfTimeEntries, numberOfVehicles) => {
    await resetDatabases();

    const randomVehicles = vehicleFactory(numberOfVehicles);
    await asyncForEach(randomVehicles, async (vehicle) => { // Många loopar, men används endast för randomisering
        const fakeUser = generateFakeVehicleOwner(vehicle.type);

        usersDb.data.users.push(fakeUser);
        await usersDb.write();
        vehicle.owner = fakeUser.pnr;

        vehiclesDb.data.vehicles.push(vehicle);
        await vehiclesDb.write();

        const randomDates = getDatesBetween(startDate, endDate);
        const randomDatesAndTimes = randomDates.map((date) => {
            const timeEntries = getTimeEntries(date, startHour, endHour, numberOfTimeEntries);
            return { date, timeEntries };
        });

        await asyncForEach(randomDatesAndTimes, async (dateWithTimes) => {
            const { date, timeEntries } = dateWithTimes;
            await asyncForEach(timeEntries,async (time) => {
                passagesDb.data.passages.push({ regNr: vehicle.regNr, date: `${date} ${time}` });
                await passagesDb.write();
            });
        });
    });

    console.log(chalk.bgGreenBright.whiteBright('Database seeded'.toUpperCase()));
};



