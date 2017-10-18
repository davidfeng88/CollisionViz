/* global google:false */

const detailEntry = ( key, value ) => (
  '<section><p><strong>' + key + '</strong><br />' + value + '</p></section>' );

const capitalize = string => (
  string.charAt( 0 )
  .toUpperCase() + string.slice( 1 ) );

const details = collision => {
  let detailsString = '<div>';
  for ( let key in collision ) {
    if (
      key === 'location' ||
      collision[ key ] === null ||
      collision[ key ] === '0'
    ) {
      continue;
    }
    detailsString += detailEntry( capitalize( key ), collision[ key ] );
  }
  detailsString += '</div>';
  return detailsString;
};

class MarkerManager {
  constructor( map ) {
    this.map = map;
    this.markersObj = {};
    let markerClustererOptions = {
      imagePath: './assets/images/marker-clusterer/m',
      // gridSize: 40,
    };
    this.MarkerClusterer = new MarkerClusterer( map, [], markerClustererOptions );
  }

  toggleMarkerClusterer( usingMarkerClusterer ) {
    if ( usingMarkerClusterer ) {
      let markersArray = Object.values( this.markersObj );
      this.MarkerClusterer.addMarkers( markersArray );
    } else {
      this.MarkerClusterer.clearMarkers();
      Object.values( this.markersObj )
        .forEach( marker => marker.setMap( this.map ) );
    }
  }

  updateMarkers( collisionsArray, taxi, bike, motorcycle, ped, usingMarkerClusterer ) {
    const collisionsObj = {};
    collisionsArray.forEach(
      collision => {
        collisionsObj[ collision.unique_key ] = collision;
      } );
    collisionsArray
      .filter( collision => !( collision.unique_key in this.markersObj ) )
      .forEach( newCollision => {
        this.createMarker( newCollision, taxi, bike, motorcycle, ped, usingMarkerClusterer );
      } );
    Object.keys( this.markersObj )
      .filter( collisionUniqueKey => !( collisionUniqueKey in collisionsObj ) )
      .forEach( collisionUniqueKey => {
        this.removeMarker( this.markersObj[ collisionUniqueKey ], usingMarkerClusterer );
      } );
  }

  createMarker( collision, taxi, bike, motorcycle, ped, usingMarkerClusterer ) {
    let lat = collision.latitude;
    let lng = collision.longitude;
    const position = new google.maps.LatLng( lat, lng );
    const icon = this.iconStyle( collision, taxi, bike, motorcycle, ped );
    const marker = new google.maps.Marker( {
      position,
      icon,
      map: this.map,
      collisionUniqueKey: collision.unique_key
    } );
    marker.addListener( 'click', () => {
      let contentString = details( collision );
      let infowindow = new google.maps.InfoWindow( {
        content: contentString
      } );
      infowindow.open( this.map, marker );
    } );
    this.markersObj[ marker.collisionUniqueKey ] = marker;
    if ( usingMarkerClusterer ) {
      this.MarkerClusterer.addMarker( marker );
    }
  }

  iconStyle( collision, taxi, bike, motorcycle, ped ) {
    if ( taxi && (
        collision.vehicle_type_code1 === 'TAXI' ||
        collision.vehicle_type_code2 === 'TAXI' ||
        collision.vehicle_type_code_3 === 'TAXI' ||
        collision.vehicle_type_code_4 === 'TAXI' ||
        collision.vehicle_type_code_5 === 'TAXI'
      ) ) {
      return {
        url: './assets/images/taxi.png',
        scaledSize: new google.maps.Size( 20, 20 ),
      };
    } else if ( bike && (
        collision.vehicle_type_code1 === 'BICYCLE' ||
        collision.vehicle_type_code2 === 'BICYCLE' ||
        collision.vehicle_type_code_3 === 'BICYCLE' ||
        collision.vehicle_type_code_4 === 'BICYCLE' ||
        collision.vehicle_type_code_5 === 'BICYCLE'
      ) ) {
      return {
        url: './assets/images/bike.png',
        scaledSize: new google.maps.Size( 30, 30 ),
      };
    } else if ( motorcycle && (
        collision.vehicle_type_code1 === 'MOTORCYCLE' ||
        collision.vehicle_type_code2 === 'MOTORCYCLE' ||
        collision.vehicle_type_code_3 === 'MOTORCYCLE' ||
        collision.vehicle_type_code_4 === 'MOTORCYCLE' ||
        collision.vehicle_type_code_5 === 'MOTORCYCLE'
      ) ) {
      return {
        url: './assets/images/motorcycle.png',
        scaledSize: new google.maps.Size( 30, 30 ),
      };
    } else if ( ped && (
        collision.number_of_pedestrians_injured > 0 ||
        collision.number_of_pedestrians_killed > 0
      ) ) {
      return {
        url: './assets/images/ped.png',
        scaledSize: new google.maps.Size( 30, 30 ),
      };
    } else {
      return {
        url: './assets/images/car-collision-favicon.svg',
        scaledSize: new google.maps.Size( 30, 30 ),
      };
    }
  }

  removeAllMarkers( usingMarkerClusterer ) {
    if ( usingMarkerClusterer ) {
      this.MarkerClusterer.clearMarkers();
    }
    Object.values( this.markersObj )
      .forEach( marker => this.removeMarker( marker ) );
  }

  removeMarker( marker, usingMarkerClusterer ) {
    this.markersObj[ marker.collisionUniqueKey ].setMap( null );
    delete this.markersObj[ marker.collisionUniqueKey ];
    if ( usingMarkerClusterer ) {
      this.MarkerClusterer.removeMarker( marker );
    }
  }
}

export default MarkerManager;
