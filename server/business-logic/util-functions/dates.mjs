import find from 'lodash/find.js';
import some from 'lodash/some.js';
import moment from 'moment';
import Holidays from 'date-holidays';
import { DATE_FORMAT, TIME_FORMAT, TollFreeReason } from './constants.mjs';
import { randomInt } from './random.mjs';

const MONTH_OF_JULY = 6;
const WEEKDAY_SATURDAY = 6;
const WEEKDAY_SUNDAY = 6;

const holidaysUtil = new Holidays();
holidaysUtil.init('SE');

const getHolidaysForYear = (year) => {
    return holidaysUtil
        .getHolidays(year || new Date().getFullYear())
        .filter(({ type }) => type === 'bank' || type === 'public')
        .map(({ date, name, type }) => {
            const [datePart] = date.split(' ');
            return { date: datePart, name, type };
        });
};

export const checkIsWeekend = (date) => {
    return (
        date.isoWeekday() === WEEKDAY_SATURDAY ||
        date.isoWeekday() === WEEKDAY_SUNDAY
    );
};

export const checkIsMonthOfJuly = (date) => {
    return date.month() === MONTH_OF_JULY;
};

export const checkIsHoliday = (date, holidays) => {
    return some(holidays, holiday => holiday.date === date.format(DATE_FORMAT))
};

export const checkIsDayBeforeHoliday = (date, holidays) => {
    const nextDay = moment(date).add(1, 'days');
    return some(holidays, holiday => holiday.date === nextDay.format(DATE_FORMAT));
};

export const getHoliday = (date, holidays) => {
    return find(holidays, holiday => holiday.date === date.format(DATE_FORMAT))
};

export const checkDate = (date) => {
    const momentDate = moment(date);
    const holidays = getHolidaysForYear(momentDate.year());
    const isHoliday = checkIsHoliday(momentDate, holidays);
    const isDayBeforeHoliday = checkIsDayBeforeHoliday(momentDate, holidays);
    const isMonthOfJuly = checkIsMonthOfJuly(momentDate);
    const isWeekend = checkIsWeekend(momentDate);

    let reason;

    if (isHoliday) {
        const { name } = getHoliday(momentDate, holidays);
        reason = name;
    } else if (isDayBeforeHoliday) {
        reason = TollFreeReason.DAY_BEFORE_HOLIDAY;
    } else if (isMonthOfJuly) {
        reason = TollFreeReason.TOLL_FREE_MONTH;
    } else if (isWeekend) {
        reason = momentDate.isoWeekday() === 6
            ? TollFreeReason.WEEKDAY_SATURDAY
            : TollFreeReason.WEEKDAY_SUNDAY;
    }

    const isTollFreeDate = (isWeekend || isHoliday || isDayBeforeHoliday || isMonthOfJuly);
    return { isTollFreeDate, reason };

};

export const getTimeEntries = (date, startHour, endHour, numberOfTimeEntries) => {
    let timeEntries = [];

    for (let i = 0; i < numberOfTimeEntries; i++) {
        const tmpDate = moment(date);
        const randomHour = randomInt(startHour, endHour);
        const randomMin = randomInt(0, 59);
        const randomSecond = randomInt(0, 59);

        tmpDate.hour(randomHour).minute(randomMin).second(randomSecond).millisecond(0);
        timeEntries.push(tmpDate);
    }

    return timeEntries
        .sort((a, b) => a.valueOf() - b.valueOf())
        .map((date) => date.format(TIME_FORMAT));
};

export const getDatesBetween = (startDate, endDate) => {
    const daysApart = moment(endDate).diff(moment(startDate), 'days') + 1;
    return new Array(daysApart).fill(0).map((val, index) => {
        const date = moment(startDate).add(index, 'days');
        return date.format(DATE_FORMAT);
    });
};