import { combineReducers } from 'redux';
import { vehiclesReducer, passagesReducer, randomizeReducer, billingReducer, usersReducer } from './reducers';

const rootReducer = combineReducers({
    vehicles: vehiclesReducer,
    passages: passagesReducer,
    random: randomizeReducer,
    billing: billingReducer,
    users: usersReducer,
});

export default rootReducer;