import * as ActionType from '../action-types';
import axios from 'axios';

export const randomize = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.RANDOMIZE_START});
            await axios.post('http://localhost:4000/api/random', {});
            const random = Date.now();
            dispatch({ type: ActionType.RANDOMIZE_COMPLETED, payload: random });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.RANDOMIZE_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const fetchVehicleOwnerById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.FETCH_USER_START});
            const res = await axios.get(`http://localhost:4000/api/users/${id}`);
            dispatch({ type: ActionType.FETCH_USER_COMPLETED, payload: res.data });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.FETCH_USER_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const fetchVehicles = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.FETCH_VEHICLES_START});
            const res = await axios.get('http://localhost:4000/api/vehicles');
            dispatch({ type: ActionType.FETCH_VEHICLES_COMPLETED, payload: res.data.vehicles });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.FETCH_VEHICLES_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const createVehicle = (vehicle) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.CREATE_VEHICLE_START});
            const res = await axios.post('http://localhost:4000/api/vehicles', vehicle);
            dispatch({ type: ActionType.CREATE_VEHICLE_COMPLETED, payload: res.data.vehicle });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.CREATE_VEHICLE_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const fetchPassagesById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.FETCH_PASSAGES_START});
            const res = await axios.get(`http://localhost:4000/api/passages/${id}`);
            dispatch({ type: ActionType.FETCH_PASSAGES_COMPLETED, payload: res.data.passages });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.FETCH_PASSAGES_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const fetchBillingByIdAndDates = (id, startDate, endDate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ActionType.FETCH_BILLING_FOR_DATES_START});
            const res = await axios.post(`http://localhost:4000/api/billing/${id}`, {
                startDate,
                endDate,
            });
            dispatch({ type: ActionType.FETCH_BILLING_FOR_DATES_COMPLETED, payload: res.data.trafficFeesByDate });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.FETCH_BILLING_FOR_DATES_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};

export const createPassage = ({ regNr, date }) => {
    return async (dispatch) => {
        try {
            console.log({ regNr, date });
            dispatch({ type: ActionType.CREATE_PASSAGE_START});
            await axios.post(`http://localhost:4000/api/passages`, {
                regNr,
                date,
            });
            dispatch({ type: ActionType.CREATE_PASSAGE_COMPLETED });
        } catch (e) {
            console.error('error');
            dispatch({ type: ActionType.CREATE_PASSAGE_ERROR, payload: `Failed test: ${e.message}` });
        }
    };
};
