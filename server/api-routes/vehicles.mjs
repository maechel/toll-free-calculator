import express from 'express';
import { getAllVehicles, createVehicle, getVehicleById } from '../api-controllers/vehicles.mjs';

const router = express.Router();

router
    .route('/')
    .get(getAllVehicles)
    .post(createVehicle);

router
    .route('/:id')
    .get(getVehicleById)

export default router;