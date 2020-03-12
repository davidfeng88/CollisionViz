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
    this.markersObj = {};
    const markerClustererOptions = {
      imagePath: './lib/marker-clusterer/m',
      // gridSize: 40,
    };
    this.MarkerClusterer = new MarkerClusterer(map, [], markerClustererOptions);
  }

  toggleMarkerClusterer(usingMarkerClusterer) {
    if (usingMarkerClusterer) {
      const markersArray = Object.values(this.markersObj);
      this.MarkerClusterer.addMarkers(markersArray);
    } else {
      this.MarkerClusterer.clearMarkers();
      Object.values(this.markersObj)
        .forEach(marker => marker.setMap(this.map));
    }
  }

  updateMarkers(collisionsArray, usingMarkerClusterer) {
    const collisionsObj = {};
    collisionsArray.forEach(
      (collision) => {
        collisionsObj[collision.unique_key] = collision;
      },
    );
    collisionsArray
      .filter(collision => !(collision.unique_key in this.markersObj))
      .forEach((newCollision) => {
        this.createMarker(newCollision, usingMarkerClusterer);
      });
    Object.keys(this.markersObj)
      .filter(collisionUniqueKey => !(collisionUniqueKey in collisionsObj))
      .forEach((collisionUniqueKey) => {
        this.removeMarker(this.markersObj[collisionUniqueKey], usingMarkerClusterer);
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
    this.markersObj[marker.collisionUniqueKey] = marker;
    if (usingMarkerClusterer) {
      this.MarkerClusterer.addMarker(marker);
    }
  }

  removeAllMarkers(usingMarkerClusterer) {
    if (usingMarkerClusterer) {
      this.MarkerClusterer.clearMarkers();
    }
    Object.values(this.markersObj)
      .forEach(marker => this.removeMarker(marker));
  }

  removeMarker(marker, usingMarkerClusterer) {
    this.markersObj[marker.collisionUniqueKey].setMap(null);
    delete this.markersObj[marker.collisionUniqueKey];
    if (usingMarkerClusterer) {
      this.MarkerClusterer.removeMarker(marker);
    }
  }
}

export default MarkerManager;
