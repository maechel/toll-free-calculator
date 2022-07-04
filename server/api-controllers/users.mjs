import { usersDb } from '../../database/index.mjs';

export const getAllUsers = async (req, res) => {
    const { users } = usersDb.data;
    res.status(200).json(users);
};

export const createUser = async (req, res) => {
    const user = req.body;
    try {
        usersDb.data.users.push({ ...user });
        await usersDb.write();
        res.status(201).send();
    } catch (e) {
        res.status(500).json({ success: false, msg: e.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const { users } = usersDb.data;
    const user = users.find((user) => user.pnr === id);
    if (user) {
        res.status(200).json({ ...user });
    } else {
        res.status(404).json({ success: false, msg: 'User not found' });
    }

};