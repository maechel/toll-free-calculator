import { seedDatabase } from '../business-logic/util-functions/databaseSeeder.mjs';

export const randomize = async (req, res) => {
    await seedDatabase('2022-06-22', '2022-07-01', 6, 19, 5, 5);
    res.status(204).send();
};