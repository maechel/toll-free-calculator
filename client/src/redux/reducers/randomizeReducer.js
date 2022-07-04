import produce from 'immer';
import * as ActionType from '../action-types';

const initialState = {
    randomId: Date.now(),
};

export const randomizeReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionType.RANDOMIZE_START:
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.RANDOMIZE_COMPLETED:
            state.randomId = action.payload;
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.RANDOMIZE_ERROR:
            state.error = action.payload;
            state.loading = false;
            return state;
        default:
            return state;
    }
}, initialState);
