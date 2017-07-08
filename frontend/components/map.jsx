import React from 'react';
import ReactDOM from 'react-dom';

import MarkerManager from '../util/marker_manager';

const mapOptions = {
  center: {
    lat: 40.732663,
    lng: -73.993479
  }, // NYC coords
  zoom: 10
};


class IndexMap extends React.Component {
  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.MarkerManager.updateMarkers(this.props.collisions);
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(this.props.collisions);
  }

  componentWillReceiveProps(newProps) {
    this.MarkerManager.updateMarkers(newProps.collisions);
  }

  handleMarkerClick(collision) {
    // render the collision detail component
  }

  render() {
    return (
      <div className="index-map" ref="map">
        Map
      </div>
    );
  }
}

export default IndexMap;
