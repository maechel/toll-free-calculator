import produce from 'immer';
import * as ActionType from '../action-types';

const initialState = {
    vehicles: [],
    loading: false,
    error: null,
};

export const vehiclesReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_VEHICLES_START:
            state.vehicles = [];
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.FETCH_VEHICLES_COMPLETED:
            state.vehicles = action.payload;
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.FETCH_VEHICLES_ERROR:
            state.error = action.payload;
            state.loading = false;
            return state;
        default:
            return state;
    }
}, initialState);
