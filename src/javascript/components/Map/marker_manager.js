/* global google:false */

const detailEntry = (key, value) => (
  `<section><p><strong>${key}</strong><br />${value}</p></section>`);

const capitalize = string => (
  string.charAt(0)
    .toUpperCase() + string.slice(1));

const details = (collision) => {
  let detailsString = '<div>';
  for (const key in collision) {
    if (
      key === 'location'
      || collision[key] === null
      || collision[key] === '0'
    ) {
      continue;
    }
    detailsString += detailEntry(capitalize(key), collision[key]);
  }
  detailsString += '</div>';
  return detailsString;
};

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
      const contentString = details(collision);
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      infowindow.open(this.map, marker);
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
