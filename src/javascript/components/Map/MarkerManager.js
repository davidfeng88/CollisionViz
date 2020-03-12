/* global google:false */

const isPairValid = ([key, value]) => (key !== 'location' && value !== null && value !== '0');

const capitalize = s => (s[0].toUpperCase() + s.slice(1));

const toDetailEntry = ([key, value]) => (
  `<section><p><strong>${capitalize(key)}</strong><br />${value}</p></section>`
);

const toDetailEntries = collision => (
  `<div>${Object.entries(collision).filter(isPairValid).map(toDetailEntry).join('')}</div>`
);

class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = [];
    const markerClustererOptions = {
      imagePath: './lib/marker-clusterer/m',
      // gridSize: 40,
    };
    this.MarkerClusterer = new MarkerClusterer(map, [], markerClustererOptions);
  }

  toggleMarkerClusterer(usingMarkerClusterer) {
    if (usingMarkerClusterer) {
      this.MarkerClusterer.addMarkers(this.markers);
    } else {
      this.MarkerClusterer.clearMarkers();
      this.markers.forEach(marker => marker.setMap(this.map));
    }
  }

  updateMarkers(collisions, usingMarkerClusterer) {
    this.removeAllMarkers(usingMarkerClusterer);
    collisions.forEach((collision) => {
      this.createMarker(collision, usingMarkerClusterer);
    });
  }

  createMarker(collision, usingMarkerClusterer) {
    const lat = collision.latitude;
    const lng = collision.longitude;
    const position = new google.maps.LatLng(lat, lng);
    const icon = {
      url: './assets/images/car-collision-favicon.svg',
      scaledSize: new google.maps.Size(30, 30),
    };
    const marker = new google.maps.Marker({
      position,
      icon,
      map: this.map,
      collisionUniqueKey: collision.unique_key,
    });
    marker.addListener('click', () => {
      const content = toDetailEntries(collision);
      const infoWindow = new google.maps.InfoWindow({
        content,
      });
      infoWindow.open(this.map, marker);
    });
    if (usingMarkerClusterer) {
      this.MarkerClusterer.addMarker(marker);
    }
    this.markers.push(marker);
  }

  removeAllMarkers(usingMarkerClusterer) {
    if (usingMarkerClusterer) {
      this.MarkerClusterer.clearMarkers();
    }
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
}

export default MarkerManager;
