import { vehiclesDb, passagesDb } from '../../database/index.mjs';
import { calculateDailyTrafficFare, isTollFreeVehicle } from '../business-logic/calculations.mjs';
import { TollFreeReason } from '../business-logic/util-functions/constants.mjs';
import { filterPassagesByIdAndDateRange } from './passages.mjs';

export const getBillingById = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const { vehicles } = vehiclesDb.data;
    const vehicle = vehicles.find((vehicle) => vehicle.regNr === id);

    const { passages } = passagesDb.data;
    const passageEventsById = filterPassagesByIdAndDateRange(id, passages, startDate, endDate);

    const sortedPassageEvents = passageEventsById
        .sort((eventA, eventB) => new Date(eventA) - new Date(eventB));

    const timesByDate = sortedPassageEvents
        .reduce((dateMap, passageEvent) => {
            const [datePart, timePart] = passageEvent.split(' ');

            if (!dateMap[datePart]) {
                dateMap[datePart] = [timePart];
            } else {
                dateMap[datePart].push(timePart);
            }

            return dateMap;
        }, {});


    const trafficFeesByDate = {};
    Object.entries(timesByDate).forEach(([date, times]) => {
        trafficFeesByDate[date] = isTollFreeVehicle(vehicle)
            ? { total: 0, reason: TollFreeReason.TOLL_FREE_VEHICLE }
            : calculateDailyTrafficFare(date, times);
    });

    res.status(200).json({ trafficFeesByDate });
};