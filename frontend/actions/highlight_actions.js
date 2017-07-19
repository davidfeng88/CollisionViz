import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_COLLISION = "RECEIVE_COLLISION";

export const receiveCollision = collision => {
  return {
    type: RECEIVE_COLLISION,
    collision
  };
};

export const updateHighlight = id => dispatch => (
  APIUtil.fetchCollision(id).then(
    (collisionData) => dispatch(receiveCollision(collisionData))
  )
);
