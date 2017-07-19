import {
  RECEIVE_HIGHLIGHT,
  RESET_HIGHLIGHT,
} from '../actions/highlight_actions';

const defaultHighlight = null;

const HighlightReducer = (state = defaultHighlight, action) => {

  switch (action.type) {
    case RECEIVE_HIGHLIGHT:
      return action.collision;

    case RESET_HIGHLIGHT:
      return defaultHighlight;

    default:
      return state;
  }
};

export default HighlightReducer;
