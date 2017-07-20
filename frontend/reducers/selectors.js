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
      let injuries = collision.number_of_persons_injured;
      let deaths = collision.number_of_persons_killed;
      if (injuries === 0 && deaths === 0) {
        return [collision.lat, collision.lng];
      } else {
        let weight = injuries * 5 + deaths * 100;
        return [collision.lat, collision.lng, weight];
      }
    });
  return heatmapData;
};
