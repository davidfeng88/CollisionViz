import { combineReducers } from 'redux';

import CollisionsReducer from './collisions_reducer';
import OptionsReducer from './options_reducer';
import HighlightReducer from './highlight_reducer';

const RootReducer = combineReducers({
  collisions: CollisionsReducer,
  options: OptionsReducer,
  highlight: HighlightReducer,
});

export default RootReducer;
