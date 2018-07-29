import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { defaultState, Reducer } from './reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const configureStore = (preloadedState = defaultState) => (
  createStore(
    Reducer,
    preloadedState,
    applyMiddleware(...middlewares),
  )
);

export default configureStore;
