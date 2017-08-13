import { RECEIVE_COLLISIONS } from '../actions/collision_actions.js';

const defaultState = {};

const IndexReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_COLLISIONS:
      let newState = {};
      action.collisions.forEach( collision => {
        let time = collision.time;
        if (newState[time]) {
          newState[time].push(collision);
        } else {
          newState[time]= [collision];
        }
      });
      return newState;

    default:
      return state;
  }
};

export default IndexReducer;
