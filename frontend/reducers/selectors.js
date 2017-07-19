export const collisionsToArray = state => {
  let collisionsArray = [];
  collisionsArray = Object.keys(state.collisions)
    .map(id => state.collisions[id]);
  return collisionsArray.reverse();
};

export const selectHighlight = state => {
  let highlight = state.highlight;
  return highlight ? highlight : null;
};
