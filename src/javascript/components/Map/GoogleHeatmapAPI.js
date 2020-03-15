const { google } = window;

const getCollisionArray = (collisions) => {
  let collisionsArray = [];
  for (let h = 0; h < 23; h++) {
    const collisionsInAnHour = collisions[h];
    if (collisionsInAnHour) { // sometimes there is no crash for an hour
      collisionsArray = collisionsArray.concat(collisionsInAnHour);
    }
  }
  return collisionsArray;
};

const drawHeatmap = (map, collisions) => {
  const collisionsArray = getCollisionArray(collisions);
  const heatmapData = collisionsArray.map(collision => new google.maps.LatLng(collision.latitude, collision.longitude));
  return new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    radius: 10,
    maxIntensity: 3,
    map,
  });
};

export default drawHeatmap;
