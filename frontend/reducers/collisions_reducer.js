import { merge } from 'lodash';

import { RECEIVE_ALL_COLLISIONS } from '../actions/collision_actions.js';
import { RECEIVE_API_COLLISIONS } from '../actions/collision_actions.js';

const defaultState = {};

const CollisionsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_COLLISIONS:
      return action.collisions;

    case RECEIVE_API_COLLISIONS:
      let newState = {};
      action.collisions.forEach( collision => {
        newState[collision.unique_key] = collision;
      });
      return newState;

    default:
      return state;
  }
};

export default CollisionsReducer;



// thoughts: returned value is an Array, can convert to
// 1. a JSON object, indexed by unique keys
// collisions: { 123456: { details}, 654321: {details}, ... }
// 2. time index
// { "00:00": [123456, 123458, ...], "00:01": [...], ... }
// 2.1 need to write a function to calculate: next minute
// update map markers is : delete last minute, add new minute

// use a spinner
