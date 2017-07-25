import React from 'react';
import { connect } from 'react-redux';

import * as APIUtil from '../util/collision_api_util';
import styles from '../util/map_style';
import { collisionsToArray } from '../reducers/selectors';
import { updateHighlight } from '../actions/highlight_actions';

import MapInfoContainer from './map_info_container';
import MarkerManager from '../util/marker_manager';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
  taxi: state.options.taxi,
  bike: state.options.bike,
  motorcycle: state.options.motorcycle,
  ped: state.options.ped,
});

const mapDispatchToProps = dispatch => ({
  updateHighlight: (collisionId) => dispatch(updateHighlight(collisionId)),
});

const mapOptions = {
  center: {
    lat: 40.732663,
    lng: -73.993479
  }, // NYC coords
  zoom: 10,
  styles: styles,
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.toggleHeatmap = this.toggleHeatmap.bind(this);
    this.toggleTraffic = this.toggleTraffic.bind(this);
    this.toggleTransit = this.toggleTransit.bind(this);
    this.toggleBicycling = this.toggleBicycling.bind(this);

  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.MarkerManager.updateMarkers(
      this.props.collisions,
      this.props.taxi,
      this.props.bike,
      this.props.motorcycle,
      this.props.ped
    );
    this.trafficLayer = new google.maps.TrafficLayer();
    this.trafficLayer.setMap(null);
    this.transitLayer = new google.maps.TransitLayer();
    this.transitLayer.setMap(null);
    this.bikeLayer = new google.maps.BicyclingLayer();
    this.bikeLayer.setMap(null);

    APIUtil.fetchAllCollisions().then(
      (collisionsData) => {
        const latLngWeights = Object.values(collisionsData)
          .map(collision => {
            let injuries = collision.number_of_persons_injured;
            let deaths = collision.number_of_persons_killed;
            if (injuries === 0 && deaths === 0) {
              return [collision.lat, collision.lng];
            } else {
              let weight = injuries * 5 + deaths * 100;
              return [collision.lat, collision.lng, weight];
            }
          });
        const heatmapData = latLngWeights.map( latLngWeight => {
          if (latLngWeight.length === 2) {
            return new google.maps.LatLng(latLngWeight[0], latLngWeight[1]);
          } else {
            return {
              location: new google.maps.LatLng(latLngWeight[0], latLngWeight[1]),
              weight: latLngWeight[2]
            };
          }
        });
        this.heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
        });
        this.heatmap.setMap(this.map);
      }
    );
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(
      this.props.collisions,
      this.props.taxi,
      this.props.bike,
      this.props.motorcycle,
      this.props.ped
    );
  }

  componentWillReceiveProps(newProps) {
    this.MarkerManager.updateMarkers(
      newProps.collisions,
      newProps.taxi,
      newProps.bike,
      newProps.motorcycle,
      this.props.ped
    );
  }

  handleMarkerClick(collision) {
    this.props.updateHighlight(collision.id);
  }

  toggleHeatmap() {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }

  toggleTraffic() {
    this.trafficLayer.setMap(this.trafficLayer.getMap() ? null : this.map);
  }

  toggleTransit() {
    this.transitLayer.setMap(this.transitLayer.getMap() ? null : this.map);
  }

  toggleBicycling() {
    this.bikeLayer.setMap(this.bikeLayer.getMap() ? null : this.map);
  }

  render() {
    return (
      <div className='map-container'>
        <MapInfoContainer />
        <div className="heatmap-panel">
          <div className='button' onClick={this.toggleHeatmap}>
            Toggle Heatmap</div>
          <div className='button' onClick={this.toggleTraffic}>
            Toggle Traffic</div>
          <div className='button' onClick={this.toggleTransit}>
            Toggle Transit</div>
          <div className='button' onClick={this.toggleBicycling}>
            Toggle Bicycling</div>
        </div>
        <div className="index-map" ref="map">
          Map
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
