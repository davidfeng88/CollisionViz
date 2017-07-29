import { merge } from 'lodash';

import { RECEIVE_ALL_COLLISIONS } from '../actions/collision_actions.js';

const defaultState = {};

const CollisionsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_COLLISIONS:
      return action.collisions;

    default:
      return state;
  }
};

export default CollisionsReducer;
