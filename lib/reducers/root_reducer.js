import { combineReducers } from 'redux';

import FiltersReducer from './filters_reducer';

const RootReducer = combineReducers({
  filters: FiltersReducer,
});

export default RootReducer;
