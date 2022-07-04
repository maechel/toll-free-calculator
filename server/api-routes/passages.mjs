import express from 'express';
import { getAllPassageEvents, createPassageEvent, getPassageEventById, getPassageEventByIdAndDateRange } from '../api-controllers/passages.mjs';

const router = express.Router();

router
    .route('/')
    .get(getAllPassageEvents)
    .post(createPassageEvent);

router
    .route('/:id')
    .get(getPassageEventById)
    .post(getPassageEventByIdAndDateRange)

export default router;