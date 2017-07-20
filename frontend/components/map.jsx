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

class Map extends React.Component {
  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);

    const heatmapData = [
      new google.maps.LatLng(40.73, -74)
    ];
    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData
    });
    heatmap.setMap(this.map);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.MarkerManager.updateMarkers(
      this.props.collisions,
      this.props.taxi,
      this.props.bike,
      this.props.motorcycle
    );
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(
      this.props.collisions,
      this.props.taxi,
      this.props.bike,
      this.props.motorcycle
    );
  }

  componentWillReceiveProps(newProps) {
    this.MarkerManager.updateMarkers(
      newProps.collisions,
      newProps.taxi,
      newProps.bike,
      newProps.motorcycle
    );
  }

  handleMarkerClick(collision) {
    this.props.updateHighlight(collision.id);
  }

  toggleHeatmap() {

  }

  changeGradient() {

  }

  changeRadius() {

  }

  changeOpacity() {

  }

  render() {
    return (
      <div className='map-container'>
        <div className="floating-panel">
          <div className='button' onClick={this.toggleHeatmap}>Toggle Heatmap</div>
          <div className='button' onClick={this.changeGradient}>Change gradient</div>
          <div className='button' onClick={this.changeRadius}>Change radius</div>
          <div className='button' onClick={this.changeOpacity}>Change opacity</div>
        </div>
        <div className="index-map" ref="map">
          Map
        </div>
      </div>
    );
  }
}

export default Map;
