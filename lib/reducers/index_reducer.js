import { RECEIVE_COLLISIONS } from '../actions/collision_actions.js';

const defaultState = {};

const IndexReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_COLLISIONS:
      let newState = {};
      action.collisions.forEach( collision => {
        if (newState[collision.time]) {
          newState[collision.time].push(collision);
        } else {
          newState[collision.time]= [collision];
        }
      });
      return newState;

    default:
      return state;
  }
};

export default IndexReducer;
