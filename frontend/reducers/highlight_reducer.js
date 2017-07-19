import { RECEIVE_COLLISION } from '../actions/highlight_actions';

const defaultHighlight = null;

const HighlightReducer = (state = defaultHighlight, action) => {

  switch (action.type) {
    case RECEIVE_COLLISION:
      return action.collision;
    default:
      return state;
  }
};

export default HighlightReducer;
