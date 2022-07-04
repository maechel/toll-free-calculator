import express from 'express';
import { randomize } from '../api-controllers/random.mjs';

const router = express.Router();

router
    .route('/')
    .post(randomize);

export default router;