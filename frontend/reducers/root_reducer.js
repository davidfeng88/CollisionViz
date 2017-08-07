import { combineReducers } from 'redux';

import CollisionsReducer from './collisions_reducer';
import FiltersReducer from './filters_reducer';
import IndexReducer from './index_reducer';

const RootReducer = combineReducers({
  collisions: CollisionsReducer,
  filters: FiltersReducer,
  index: IndexReducer,
});

export default RootReducer;
