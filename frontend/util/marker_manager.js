/* global google:false */

class MarkerManager {
  constructor(map, handleClick){
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }

  updateMarkers(collisions){
    const collisionsObj = {};
    collisions.forEach(collision => collisionsObj[collision.id] = collision);

    collisions
      .filter(collision => !this.markers[collision.id])
      .forEach(newCollision => this.createMarkerFromCollision(newCollision));

    Object.keys(this.markers)
      .filter(collisionId => !collisionsObj[collisionId])
      .forEach((collisionId) => this.removeMarker(this.markers[collisionId]));
  }

  createMarkerFromCollision(collision) {
    const position = new google.maps.LatLng(collision.lat, collision.lng);
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon: {
        url: window.staticImages.logo,
        scaledSize: new google.maps.Size(20, 20),
        // url: window.staticImages.taxi,
        // scaledSize: new google.maps.Size(40, 40),
        // url: window.staticImages.motorcycle,
        // scaledSize: new google.maps.Size(30, 30),
        // url: window.staticImages.bike,
        // scaledSize: new google.maps.Size(30, 30),
      },
      collisionId: collision.id
    });

    marker.addListener('click', () => this.handleClick(collision));
    this.markers[marker.collisionId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.collisionId].setMap(null);
    delete this.markers[marker.collisionId];
  }
}

export default MarkerManager;
