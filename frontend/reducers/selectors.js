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

export const heatmapCollisionsToArray = state => {
  let heatmapData = Object.values(state.heatmap)
    .map(collision => {
      return [collision.lat, collision.lng];
    });
  return heatmapData;
};
