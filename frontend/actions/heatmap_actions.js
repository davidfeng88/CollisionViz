import * as APIUtil from '../util/collision_api_util';

export const HEATMAP_RECEIVE_ALL_COLLISIONS = "HEATMAP_RECEIVE_ALL_COLLISIONS";

export const heatmapReceiveAllCollisions = collisions => {
  return {
    type: HEATMAP_RECEIVE_ALL_COLLISIONS,
    collisions
  };
};

export const fetchAllCollisions = () => dispatch => (
  APIUtil.fetchAllCollisions().then(
    (collisionsData) => dispatch(heatmapReceiveAllCollisions(collisionsData))
  )
);
