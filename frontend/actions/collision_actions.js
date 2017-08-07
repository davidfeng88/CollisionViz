import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_ALL_COLLISIONS = "RECEIVE_ALL_COLLISIONS";
export const RECEIVE_API_COLLISIONS = "RECEIVE_API_COLLISIONS";

export const receiveAllCollisions = collisions => {
  return {
    type: RECEIVE_ALL_COLLISIONS,
    collisions
  };
};

export const fetchAllCollisions = (filters) => dispatch => (
  APIUtil.fetchAllCollisions(filters).then(
    (collisionsData) => dispatch(receiveAllCollisions(collisionsData))
  )
);

export const receiveApiCollisions = collisions => {
  return {
    type: RECEIVE_API_COLLISIONS,
    collisions
  };
};

export const fetchApiCollisions = date => dispatch => {
  return(
  APIUtil.fetchApiCollisions(date).then(
    (collisionsData) => dispatch(receiveApiCollisions(collisionsData))
  ));
};

// dispatch is not a function?!!
