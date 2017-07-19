import { UPDATE_HIGHLIGHT } from '../actions/highlight_actions';

const defaultFilters = -1;

const HighlightReducer = (state = defaultFilters, action) => {

  switch (action.type) {
    case UPDATE_HIGHLIGHT:
      return action.collisionId;
    default:
      return state;
  }
};

export default HighlightReducer;
