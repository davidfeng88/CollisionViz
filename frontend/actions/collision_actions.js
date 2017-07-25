import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_ALL_COLLISIONS = "RECEIVE_ALL_COLLISIONS";

export const receiveAllCollisions = collisions => {
  return {
    type: RECEIVE_ALL_COLLISIONS,
    collisions
  };
};

export const fetchAllCollisions = (options) => dispatch => (
  APIUtil.fetchAllCollisions(options).then(
    (collisionsData) => dispatch(receiveAllCollisions(collisionsData))
  )
);
