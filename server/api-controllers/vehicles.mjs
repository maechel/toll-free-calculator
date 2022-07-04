import { usersDb, vehiclesDb } from '../../database/index.mjs';
import { generateFakeVehicleOwner } from '../business-logic/util-functions/user.js';

export const getAllVehicles = async (req, res) => {
    const { vehicles } = vehiclesDb.data;
    res.status(200).json({ vehicles });
};

export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    try {
        const owner = generateFakeVehicleOwner(vehicle.type);
        usersDb.data.users.push(owner);
        await usersDb.write();

        vehicle.owner = owner.pnr;
        vehiclesDb.data.vehicles.push({ ...vehicle });
        await vehiclesDb.write();

        res.status(201).send();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const getVehicleById = async (req, res) => {
    const { id } = req.params;
    const { vehicles } = vehiclesDb.data;
    const vehicle = vehicles.find((vehicle) => vehicle.regNr === id);
    if (vehicle) {
        res.status(200).json({ ...vehicle });
    } else {
        res.status(404).json({ error: 'Vehicle not found' });
    }
};