import express from 'express';
import { getBillingById } from '../api-controllers/billing.mjs';

const router = express.Router();

router
    .route('/:id')
    .post(getBillingById)

export default router;