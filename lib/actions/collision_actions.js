import * as APIUtil from '../util/collision_api_util';

export const RECEIVE_COLLISIONS = "RECEIVE_COLLISIONS";

export const receiveCollisions = collisions => ({
  type: RECEIVE_COLLISIONS,
  collisions
});

export const fetchCollisions = date => dispatch => (
  APIUtil.fetchCollisions(date)
    .then(
      (response) =>
        response.json()
    ).then(
      (collisionsData) =>
        dispatch(receiveCollisions(collisionsData))
    )
);
