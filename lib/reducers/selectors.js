import parseTime from '../util/time_util';

export const collisionsToArray = state => {
  let collisionsArray = [];
  collisionsArray = Object.keys(state.collisions)
    .map(id => state.collisions[id]);
  return collisionsArray.reverse();
};

export const collisionsArrayToAdd = state => {
  let TimeString = parseTime(state.filters.finish);
  if (state.collisions && state.collisions[TimeString]) {
    return state.collisions[TimeString];
  } else {
    return [];
  }
};

export const collisionsArrayToDelete = state => {
  let TimeString = parseTime(state.filters.start - 1);
  if (state.collisions && state.collisions[TimeString]) {
    return state.collisions[TimeString];
  } else {
    return [];
  }
};
