import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

const middlewareEnhancers = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancers];
const composedEnhancer = composeWithDevTools(...storeEnhancers);

export const store = createStore(rootReducer, composedEnhancer);

if(process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const newReducer = require('./rootReducer').default;
            store.replaceReducer(newReducer);
        });
    }
}

export default store;