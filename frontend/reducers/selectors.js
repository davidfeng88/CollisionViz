import parseTime from '../util/time_util';

export const collisionsToArray = state => {
  let collisionsArray = [];
  collisionsArray = Object.keys(state.collisions)
    .map(id => state.collisions[id]);
  return collisionsArray.reverse();
};

export const collisionsArrayToAdd = state => {
  debugger
  let collisionsArray = [];
  let newCurrentTimeString = parseTime(state.filters.fiish);
  if (state.index[newCurrentTimeString]) {
    state.index[newCurrentTimeString].forEach( (uniqueKey) => {
      collisionsArray.push(state.collisions.uniqueKey);
    });
  }
  return collisionsArray;
};
//
// export const collisionsArrayToAdd = state => {
//
// };
