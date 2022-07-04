import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const usersFilePath = join(__dirname, '..', 'data', 'users.json');
const usersDb = new Low(new JSONFile(usersFilePath));
usersDb.data = usersDb.data || { users: [] };

const vehiclesFilePath = join(__dirname, '..', 'data', 'vehicles.json');
const vehiclesDb = new Low(new JSONFile(vehiclesFilePath));
vehiclesDb.data = vehiclesDb.data || { vehicles: [] };

const passagesFilePath = join(__dirname, '..', 'data', 'passages.json');
const passagesDb = new Low(new JSONFile(passagesFilePath));
passagesDb.data = passagesDb.data || { passages: [] };

(async () => {
    await usersDb.read();
    await vehiclesDb.read();
    await passagesDb.read();
})();

export {
    usersDb,
    vehiclesDb,
    passagesDb,
}









