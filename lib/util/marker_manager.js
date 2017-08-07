/* global google:false */

const detailEntry = (key, value) => (
  "<section><p><b>"+key+"</b><br />"+value+"</p></section>");

const capitalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1));

const details = (collision) => {
  let detailsString = "<div>";
  for (let key in collision) {
    if (
      key ==='location' ||
      collision[key] === null ||
      collision[key] === "0"
    ) {
      continue;
    }
    detailsString += detailEntry(capitalize(key), collision[key]);
  }
  detailsString += "</div>";
  return detailsString;
};

class MarkerManager {
  constructor(map){
    this.map = map;
    this.markers = {};
  }

  addMarkers(collisions, taxi, bike, motorcycle, ped) {
    collisions
      .forEach(newCollision => this.createMarkerFromCollision(
        newCollision, taxi, bike, motorcycle, ped));
  }

  removeMarkers(collisions, taxi, bike, motorcycle, ped) {
    collisions
      .forEach(collision => this.removeMarker(this.markers[collision.unique_key]));
  }

  updateMarkers(collisions, taxi, bike, motorcycle, ped){
    const collisionsObj = {};
    collisions.forEach(collision => collisionsObj[collision.id] = collision);

    collisions
      .filter(collision => !this.markers[collision.id])
      .forEach(newCollision => this.createMarkerFromCollision(
        newCollision, taxi, bike, motorcycle, ped));

    Object.keys(this.markers)
      .filter(collisionId => !collisionsObj[collisionId])
      .forEach((collisionId) => this.removeMarker(this.markers[collisionId]));
  }

  iconStyle(collision, taxi, bike, motorcycle, ped) {
    if (taxi && (
      collision.vehicle_type_code1 === 'Taxi' ||
      collision.vehicle_type_code2 === 'Taxi' ||
      collision.vehicle_type_code_3 === 'Taxi' ||
      collision.vehicle_type_code_4 === 'Taxi' ||
      collision.vehicle_type_code_5 === 'Taxi'
    )) {
      return {
        url: "/assets/images/taxi.png",
        scaledSize: new google.maps.Size(20, 20),
      };
    } else if (bike && (
      collision.vehicle_type_code1 === 'Bicycle' ||
      collision.vehicle_type_code2 === 'Bicycle' ||
      collision.vehicle_type_code_3 === 'Bicycle' ||
      collision.vehicle_type_code_4 === 'Bicycle' ||
      collision.vehicle_type_code_5 === 'Bicycle'
    )) {
      return {
        url: window.staticImages.bike,
        scaledSize: new google.maps.Size(30, 30),
      };
    } else if (motorcycle && (
      collision.vehicle_type_code1 === 'Motorcycle' ||
      collision.vehicle_type_code2 === 'Motorcycle' ||
      collision.vehicle_type_code_3 === 'Motorcycle' ||
      collision.vehicle_type_code_4 === 'Motorcycle' ||
      collision.vehicle_type_code_5 === 'Motorcycle'
    )) {
      return {
        url: "./assets/images/motorcycle.png",
        scaledSize: new google.maps.Size(30, 30),
      };
    } else if (ped && (
      collision.number_of_pedestrians_injured > 0 ||
      collision.number_of_pedestrians_killed > 0
    )) {
      return {
        url: "./assets/images/ped.png",
        scaledSize: new google.maps.Size(30, 30),
      };
    } else {
      return {
        url: "./assets/images/car-collision-favicon.svg",
        scaledSize: new google.maps.Size(30, 30),
      };
    }
  }

  createMarkerFromCollision(collision, taxi, bike, motorcycle, ped) {
    const position = new google.maps.LatLng(collision.latitude, collision.longitude);
    const iconStyle = this.iconStyle(collision, taxi, bike, motorcycle, ped);
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon: iconStyle,
      collisionId: collision.unique_key
    });

    marker.addListener('click', () => {
      let contentString = details(collision);
      let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      infowindow.open(this.map, marker);
    });
    this.markers[marker.collisionId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.collisionId].setMap(null);
    delete this.markers[marker.collisionId];
  }
}

export default MarkerManager;
