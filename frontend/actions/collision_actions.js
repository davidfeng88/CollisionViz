import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_ALL_COLLISIONS = "RECEIVE_ALL_COLLISIONS";
export const RECEIVE_COLLISION = "RECEIVE_COLLISION";

export const receiveAllCollisions = collisions => {
  return {
    type: RECEIVE_ALL_COLLISIONS,
    collisions
  };
};

export const receiveCollision = collision => {
  return {
    type: RECEIVE_COLLISION,
    collision
  };
};

export const fetchAllCollisions = (filters) => dispatch => (
  APIUtil.fetchAllCollisions(filters).then(
    (collisionsData) => dispatch(receiveAllCollisions(collisionsData))
  )
);

export const fetchCollision = id => dispatch => (
  APIUtil.fetchCollision(id).then(
    (collisionData) => dispatch(receiveCollision(collisionData))
  )
);
