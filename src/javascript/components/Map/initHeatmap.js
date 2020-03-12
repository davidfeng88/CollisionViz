/* global google:false */

const initHeatmap = (map, collisions) => {
  const heatmapData = collisions.map(collision => new google.maps.LatLng(collision.latitude, collision.longitude));
  return new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    radius: 10,
    maxIntensity: 3,
    map,
  });
};

export default initHeatmap;
