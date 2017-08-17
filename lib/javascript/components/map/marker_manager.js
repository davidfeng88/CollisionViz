/* global google:false */

const detailEntry = (key, value) => (
  "<section><p><b>"+key+"</b><br />"+value+"</p></section>");

const capitalize = string => (
  string.charAt(0).toUpperCase() + string.slice(1));

const details = collision => {
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
    this.markersObj = {};
  }

  updateMarkers(collisionsArray, taxi, bike, motorcycle, ped) {
    const collisionsObj = {};
    collisionsArray.forEach(
      collision => {collisionsObj[collision.unique_key] = collision;});
    collisionsArray
      .filter(collision => !this.markersObj[collision.unique_key])
      .forEach(newCollision => {
        this.createMarker(newCollision, taxi, bike, motorcycle, ped);
      });
    Object.keys(this.markersObj)
      .filter(collisionUniqueKey => !collisionsObj[collisionUniqueKey])
      .forEach(collisionUniqueKey => {
        this.removeMarker(this.markersObj[collisionUniqueKey]);
      });
  }

  createMarker(collision, taxi, bike, motorcycle, ped) {
    let lat = collision.latitude;
    let lng = collision.longitude;
    const position = new google.maps.LatLng(lat, lng);
    const icon = this.iconStyle(collision, taxi, bike, motorcycle, ped);
    const marker = new google.maps.Marker({
      position, icon,
      map: this.map,
      collisionUniqueKey: collision.unique_key
    });
    marker.addListener('click', () => {
      let contentString = details(collision);
      let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      infowindow.open(this.map, marker);
    });
    this.markersObj[marker.collisionUniqueKey] = marker;
  }

  iconStyle(collision, taxi, bike, motorcycle, ped) {
    if (taxi && (
      collision.vehicle_type_code1 === 'TAXI' ||
      collision.vehicle_type_code2 === 'TAXI' ||
      collision.vehicle_type_code_3 === 'TAXI' ||
      collision.vehicle_type_code_4 === 'TAXI' ||
      collision.vehicle_type_code_5 === 'TAXI'
    )) {
      return {
        url: "./assets/images/taxi.png",
        scaledSize: new google.maps.Size(20, 20),
      };
    } else if (bike && (
      collision.vehicle_type_code1 === 'BICYCLE' ||
      collision.vehicle_type_code2 === 'BICYCLE' ||
      collision.vehicle_type_code_3 === 'BICYCLE' ||
      collision.vehicle_type_code_4 === 'BICYCLE' ||
      collision.vehicle_type_code_5 === 'BICYCLE'
    )) {
      return {
        url: "./assets/images/bike.png",
        scaledSize: new google.maps.Size(30, 30),
      };
    } else if (motorcycle && (
      collision.vehicle_type_code1 === 'MOTORCYCLE' ||
      collision.vehicle_type_code2 === 'MOTORCYCLE' ||
      collision.vehicle_type_code_3 === 'MOTORCYCLE' ||
      collision.vehicle_type_code_4 === 'MOTORCYCLE' ||
      collision.vehicle_type_code_5 === 'MOTORCYCLE'
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

  removeAllMarkers() {
    Object.keys(this.markersObj)
      .forEach(collisionUniqueKey =>
        this.removeMarker(this.markersObj[collisionUniqueKey]));
  }

  removeMarker(marker) {
    this.markersObj[marker.collisionUniqueKey].setMap(null);
    delete this.markersObj[marker.collisionUniqueKey];
  }
}

export default MarkerManager;
