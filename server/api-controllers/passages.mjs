import includes from 'lodash/includes.js';
import { passagesDb } from '../../database/index.mjs';
import { getDatesBetween } from '../business-logic/util-functions/dates.mjs';

export const getAllPassageEvents = async (req, res) => {
    const { passages } = passagesDb.data;
    res.status(200).json(passages);
};

export const createPassageEvent = async (req, res) => {
    const passage = req.body;
    try {
        console.log({ passage });
        passagesDb.data.passages.push({ ...passage });
        await passagesDb.write();
        res.status(201).send();
    } catch (e) {
        res.status(500).json({ success: false, msg: e.message });
    }
};

export const filterPassagesByIdAndDateRange = (id, passages, startDate, endDate) => {
    const datesBetween = getDatesBetween(startDate, endDate);
    return passages
        .filter(({ regNr, date }) => {
            const [datePart] = date.split(' ');
            const idMatch = regNr === id;
            const inDateRange = includes(datesBetween, datePart);
            return idMatch && inDateRange;
        })
        .map((passage) => passage.date);
};

export const getPassageEventByIdAndDateRange = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const { passages } = passagesDb.data;

    const passageEventsById = filterPassagesByIdAndDateRange(id, passages, startDate, endDate);

    res.status(200).json({ regNr: id, passages: passageEventsById });
};

export const getPassageEventById = async (req, res) => {
    const { id } = req.params;
    const passages = passagesDb.data.passages.filter(({ regNr }) => regNr === id).map(({ date }) => date);

    res.status(200).json({ passages });
};