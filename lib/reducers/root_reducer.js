import { combineReducers } from 'redux';

import CollisionsReducer from './collisions_reducer';
import FiltersReducer from './filters_reducer';

const RootReducer = combineReducers({
  collisions: CollisionsReducer,
  filters: FiltersReducer,
});

export default RootReducer;
