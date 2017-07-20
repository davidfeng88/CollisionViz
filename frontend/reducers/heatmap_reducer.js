import {
  HEATMAP_RECEIVE_ALL_COLLISIONS
} from '../actions/heatmap_actions.js';

const defaultState = {};

const HeatmapReducer = (state = defaultState, action) => {
  switch(action.type) {
    case HEATMAP_RECEIVE_ALL_COLLISIONS:
      return action.collisions;
    default:
      return state;
  }
};

export default HeatmapReducer;
