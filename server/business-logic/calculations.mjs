import moment from 'moment';
import includes from 'lodash/includes.js';
import { TollFreeVehicles, trafficFares } from './util-functions/constants.mjs';
import { checkDate } from './util-functions/dates.mjs';

const MAX_DAILY_FEE = 60;

const isLowFare = (hour, minute) => {
    return (
        (hour === 6 && minute <= 29) ||
        ((hour === 8 && minute >= 30 && minute <= 59) || ((hour >= 9 && hour <= 14) && minute <= 59)) ||
        (hour === 18 && minute <= 29)
    );
};

const isMidFare = (hour, minute) => {
    return (
        (hour === 6 && (minute >= 30 && minute <= 59)) ||
        (hour === 8 && minute <= 29) ||
        (hour === 15 && minute <= 29) ||
        (hour === 17)
    );
};

const isHighFare = (hour, minute) => {
    return (
        (hour === 7 || hour === 16) ||
        (hour === 15 && minute >= 30)
    );
};

export const getTrafficFare = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map((str) => +str);

    if (isLowFare(hour, minute)) {
        return trafficFares.LOW_FARE;
    } else if (isMidFare(hour, minute)) {
        return trafficFares.MID_FARE;
    } else if (isHighFare(hour, minute)) {
        return trafficFares.HIGH_FARE;
    } else {
        return 0;
    }
};

export const calculateDailyTrafficFare = (date, times) => {
    const { isTollFreeDate, reason } = checkDate(date);

    if (isTollFreeDate) {
        return { total: 0, reason };
    }

    const [firstTimeEntry, ...otherTimeEntries] = times;

    if (times.length === 1) {
        return { total: getTrafficFare(firstTimeEntry), reason: '' };
    }

    let total = 0;
    let tmpFee = getTrafficFare(firstTimeEntry);
    let newHourStart = createMomentDate(`${date} ${firstTimeEntry}`);

    otherTimeEntries.forEach((time) => {
        const currentTime = createMomentDate(`${date} ${time}`);
        if (currentTime.diff(newHourStart, 'minutes') <= 60) {
            const currentFee = getTrafficFare(time);
            tmpFee = Math.max(tmpFee, currentFee);
        } else {
            newHourStart = moment(currentTime);

            total += getTrafficFare(time);
            total += tmpFee;
            tmpFee = 0;
        }
    });

    total += tmpFee;

    return {
        total: Math.min(total, MAX_DAILY_FEE),
        reason: ''
    };
};

const createMomentDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(' ');
    const [hour, minute] = timePart.split(':');

    const momentDate = moment(datePart);
    momentDate.hour(+hour).minute(+minute).second(0);

    return momentDate;
};

export const isTollFreeVehicle = ({ type }) => {
    return includes(Object.values(TollFreeVehicles), type);
};
