import express from 'express';
import { getAllUsers, createUser, getUserById } from '../api-controllers/users.mjs';

const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)

export default router;