export const TollFreeVehicles = Object.freeze({
    MOTORBIKE: 'Motorbike',
    TRACTOR: 'Tractor',
    EMERGENCY: 'Emergency',
    DIPLOMAT: 'Diplomat',
    FOREIGN: 'Foreign',
    MILITARY: 'Military'
});

export const TollFreeReason = Object.freeze({
    TOLL_FREE_VEHICLE: 'Avgiftsfritt fordon',
    WEEKDAY_SATURDAY: 'Lördag',
    WEEKDAY_SUNDAY: 'Söndag',
    DAY_BEFORE_HOLIDAY: 'Dag före nationell helgdag',
    TOLL_FREE_MONTH: 'Avgiftsfri månad',
});

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';

export const trafficFares = {
    LOW_FARE: 9,
    MID_FARE: 16,
    HIGH_FARE: 22,
};