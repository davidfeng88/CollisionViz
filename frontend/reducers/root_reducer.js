import { combineReducers } from 'redux';

import CollisionsReducer from './collisions_reducer';
import FiltersReducer from './filters_reducer';
import HighlightReducer from './highlight_reducer';

const RootReducer = combineReducers({
  collisions: CollisionsReducer,
  filters: FiltersReducer,
  highlight: HighlightReducer,
});

export default RootReducer;
