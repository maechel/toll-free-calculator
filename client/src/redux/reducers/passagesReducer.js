import produce from 'immer';
import * as ActionType from '../action-types';

const initialState = {
    passages: [],
    loading: false,
    error: null,
};

export const passagesReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_PASSAGES_START:
            state.passages = [];
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.FETCH_PASSAGES_COMPLETED:
            state.passages = action.payload;
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.FETCH_PASSAGES_ERROR:
            state.error = action.payload;
            state.loading = false;
            return state;
        case ActionType.CREATE_PASSAGE_START:
            state.error = null;
            state.loading = true;
            return state;
        case ActionType.CREATE_PASSAGE_COMPLETED:
            state.error = null;
            state.loading = false;
            return state;
        case ActionType.CREATE_PASSAGE_ERROR:
            state.error = action.payload
            state.loading = false;
            return state;
        default:
            return state;
    }
}, initialState);
