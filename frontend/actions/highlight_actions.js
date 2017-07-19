import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_HIGHLIGHT = "RECEIVE_HIGHLIGHT";
export const RESET_HIGHLIGHT = "RESET_HIGHLIGHT";

export const resetHighlight = () => {
  return {
    type: RESET_HIGHLIGHT,
  };
};
export const receiveHighlight = collision => {
  return {
    type: RECEIVE_HIGHLIGHT,
    collision
  };
};

export const updateHighlight = id => dispatch => (
  APIUtil.fetchCollision(id).then(
    (collisionData) => dispatch(receiveHighlight(collisionData))
  )
);
