import crypto from 'crypto';
import { TollFreeVehicles } from './constants.mjs';

const maxValue = 281_474_976_710_655;
const DEFAULT_SKEW_FACTOR = .5;
const HEX_LENGTH_DEFAULT = 3;

/**
 *
 * @param {number} [min=0] min - lower value, inclusive
 * @param {number} [max=281474976710655] max - higher value, inclusive
 * @returns {number} - random integer between min and max inclusive
 */
export const randomInt = (min = 0, max) => {
    const safeMin = Number.isSafeInteger(min) ? min : maxValue;
    const safeMax = Number.isSafeInteger(max + 1) ? max + 1 : maxValue;
    return crypto.randomInt(safeMin, safeMax);
};

/**
 *
 * @param {number} [skewFactor=0.5]
 * @returns {boolean} random true or false, optional skew factor
 */
export const randomBool = (skewFactor = DEFAULT_SKEW_FACTOR) => {
    return Math.random() < skewFactor;
};

/**
 *
 * @param {number} [length=3] length - The length of random bytes, between 1 and 10
 * @returns {string} - a hex-string representation of random bytes
 */
export const generateRandomHex = (length = HEX_LENGTH_DEFAULT) => {
    let rangedLength = length;
    if (length > 10) {
        rangedLength = 10;
    } else if (length < 1) {
        rangedLength = 1;
    }
    return crypto.randomBytes(rangedLength).toString('hex');
};

/**
 *
 * @returns {string} type - type of toll-free vehicle
 */
export const getRandomTollFreeVehicleType = () => {
    const vehicleTypes = Object.values(TollFreeVehicles);
    const randomVehicleTypeIndex = randomInt(0, vehicleTypes.length - 1);
    return vehicleTypes.at(randomVehicleTypeIndex);
};


