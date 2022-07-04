import produce from 'immer';
import * as ActionType from '../action-types';

const initialState = {
    trafficFeesByDate: {},
    loading: false,
    error: null,
};

export const billingReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_BILLING_FOR_DATES_START:
            state.trafficFeesByDate = {};
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.FETCH_BILLING_FOR_DATES_COMPLETED:
            state.trafficFeesByDate = action.payload;
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.FETCH_BILLING_FOR_DATES_ERROR:
            state.error = action.payload;
            state.loading = false;
            return state;
        default:
            return state;
    }
}, initialState);
