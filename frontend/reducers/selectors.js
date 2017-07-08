export const collisionsToArray = state => {
  let collisionsArray = [];
  collisionsArray = Object.keys(state.collisions)
    .map(id => state.collisions[id]);
  return collisionsArray.reverse();
};
