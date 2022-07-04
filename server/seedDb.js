import { seedDatabase } from './business-logic/util-functions/databaseSeeder.mjs';

const START_DATE = '2022-06-22';
const END_DATE = '2022-07-01';

const START_HOUR = 6;
const END_HOUR = 19;

const NUM_OF_TIME_ENTRIES = 5;
const NUM_OF_VEHICLES = 5;

(async () => {
    await seedDatabase(START_DATE, END_DATE, START_HOUR, END_HOUR, NUM_OF_TIME_ENTRIES, NUM_OF_VEHICLES);
})();