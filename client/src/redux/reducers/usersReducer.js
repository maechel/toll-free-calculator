import produce from 'immer';
import * as ActionType from '../action-types';

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

export const usersReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_USER_START:
            state.user = null;
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.FETCH_USER_COMPLETED:
            state.user = action.payload;
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.FETCH_USER_ERROR:
            state.error = action.payload;
            state.loading = false;
            return state;
        default:
            return state;
    }
}, initialState);
