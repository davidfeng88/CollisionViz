import { merge } from 'lodash';

import {
  RECEIVE_ALL_COLLISIONS,
  RECEIVE_COLLISION,
} from '../actions/collision_actions.js';

const defaultState = {};

const CollisionsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_ALL_COLLISIONS:
      return action.collisions;

    case RECEIVE_COLLISION:
      newState[action.collision.id] = action.collision;
      return newState;

    default:
      return state;
  }
};

export default CollisionsReducer;
