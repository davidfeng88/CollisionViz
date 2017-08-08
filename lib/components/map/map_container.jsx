import React from 'react';
import { connect } from 'react-redux';

import * as APIUtil from '../../util/collision_api_util'; // heatmap!
import { collisionsToArray } from '../../reducers/selectors';
import { updateFilter } from '../../actions/filter_actions';

import Toggle from '../toggle';
import MapInfoContainer from './map_info_container';
import MarkerManager from '../../util/marker_manager';
import alternativeMapStyle from './styles';

const mapStateToProps = state => ({
  collisions: state.collisions, // heatmap!
  collisionsArrayToAdd: collisionsToArray(state, state.filters.finish),
  collisionsArrayToRemove: collisionsToArray(state, state.filters.start - 1),
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
});

const NYC_CENTER = {lat: 40.732663, lng: -73.993479};
const DEFAULT_ZOOM_LEVEL = 10;

const mapOptions = {
  center: NYC_CENTER,
  zoom: DEFAULT_ZOOM_LEVEL,
};

const defaultMapState = {
  showExtra: false,
  alternativeMapStyle: false,

  // map layers
  heatmap: true,
  traffic: false,
  transit: false,
  bicycling: false,
  // special icons
  taxi: true,
  bike: true,
  motorcycle: true,
  ped: true,
};

const INJURY_WEIGHT = 5;
const DEATH_WEIGHT = 100;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultMapState;

    this.resetMapBorders = this.resetMapBorders.bind(this);
    this.extraPanel = this.extraPanel.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);

    this.MarkerManager.createMarkers(
      this.props.collisionsArrayToAdd,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
    this.MarkerManager.removeMarkers(
      this.props.collisionsArrayToRemove,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
    this.traffic = new google.maps.TrafficLayer();
    this.traffic.setMap(null);
    this.transit = new google.maps.TransitLayer();
    this.transit.setMap(null);
    this.bicycling = new google.maps.BicyclingLayer();
    this.bicycling.setMap(null);

    // let heatmapData = this.props.collisions.map( collision => {
    //   let injuries = collision.number_of_persons_injured;
    //   let deaths = collision.number_of_persons_killed;
    //   if (injuries === 0 && deaths === 0) {
    //     return new google.maps.LatLng(collision.latitude, collision.longitude);
    //   } else {
    //     let weight = injuries * INJURY_WEIGHT + deaths * DEATH_WEIGHT;
    //     return {
    //       location: new google.maps.LatLng(collision.latitude, collision.longitude),
    //       weight,
    //     };
    //   }
    // });
    // this.heatmap = new google.maps.visualization.HeatmapLayer({
    //   data: heatmapData,
    // });
    // this.heatmap.setMap(this.map);
  }

  componentWillReceiveProps(newProps) {
    // if (newProps.collisions.length > 0 && !this.heatmap && this.map) {
    //   let heatmapData = newProps.collisions.map( collision => {
    //           debugger;
    //     let lat = parseFloat(collision.latitude);
    //     let lng = parseFloat(collision.longitude);
    //     let injuries = parseInt(collision.number_of_persons_injured);
    //     let deaths = parseInt(collision.number_of_persons_killed);
    //     if (injuries && deaths && injuries > 0 && deaths > 0 ) {
    //       let weight = injuries * INJURY_WEIGHT + deaths * DEATH_WEIGHT;
    //       return {
    //         location: new google.maps.LatLng(lat, lng),
    //         weight,
    //       };
    //     } else {
    //       return new google.maps.LatLng(lat, lng);
    //     }
    //   });
    //   debugger;
    //   this.heatmap = new google.maps.visualization.HeatmapLayer({
    //     data: heatmapData,
    //   });
    //   this.heatmap.setMap(this.map);
    // }
    this.MarkerManager.createMarkers(
      newProps.collisionsArrayToAdd,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
    this.MarkerManager.removeMarkers(
      this.props.collisionsArrayToRemove,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
  }

  toggle(field) {
    return e => {
      let newValue = !this.state[field];
      this.setState({ [field]: !this.state[field] });
      if (field === 'alternativeMapStyle') {
        let newStyle = newValue ? alternativeMapStyle : [];
        this.map.setOptions({styles: newStyle});
      }
    };
  }
  // fat arrow functions automatic bind this

  toggleMapLayer(field) {
    // fat arrow takes care of binding
    if (this.state[field]) {
      this[field].setMap(null);
      this.setState({[field]: false});
    } else {
      this[field].setMap(this.map);
      this.setState({[field]: true});
    }
  }

  resetMapBorders() {
    this.map.setCenter(NYC_CENTER);
    this.map.setZoom(DEFAULT_ZOOM_LEVEL);
  }

  extraPanel() {
    if (this.state.showExtra) {
      return(
        <div className='extra-map-panel extra-panel bordered'>
          <div
            onClick={(e) => this.setState({showExtra: false})}
            className='close'>
            ×
          </div>
          <div className='flex-row extra-panel-row'>
            <b>More Map Options</b>
          </div>
          <div className='flex-row'>
            <b>Toggle Special Icons</b>
          </div>
          <div className='flex-row extra-panel-row'>
            <Toggle
              label="Taxi"
              checked={this.state.taxi}
              onChange={this.toggle('taxi')} />
            <Toggle
              label="Bike"
              checked={this.state.bike}
              onChange={this.toggle('bike')} />
            <Toggle
              label="Motorcycle"
              checked={this.state.motorcycle}
              onChange={this.toggle('motorcycle')} />

            <Toggle
              label="Pedestrian"
              checked={this.state.ped}
              onChange={this.toggle('ped')} />
          </div>
          <div className='flex-row'>
            <b>Toggle Map Layers</b>
          </div>
          <div className='flex-row extra-panel-row'>
            <Toggle
              label="Heatmap"
              checked={this.state.heatmap}
              onChange={() => this.toggleMapLayer('heatmap')} />
            <Toggle
              label="Traffic"
                checked={this.state.traffic}
              onChange={() => this.toggleMapLayer('traffic')} />
            <Toggle
              label="Transit"
              checked={this.state.transit}
              onChange={() => this.toggleMapLayer('transit')} />
            <Toggle
              label="Bicycling"
              checked={this.state.bicycling}
              onChange={() => this.toggleMapLayer('bicycling')} />
          </div>

          <div className='flex-row extra-panel-row'>
            <Toggle
              label="Alternative Map Style"
              checked={this.state.alternativeMapStyle}
              onChange={this.toggle('alternativeMapStyle')} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <div className='main-panel flex-row'>
          <MapInfoContainer />
          <div className='clickable-div bordered' onClick={this.resetMapBorders}>
            Reset Map Borders
          </div>
          <Toggle
            label="More Map Options"
            checked={this.state.showExtra}
            onChange={this.toggle('showExtra')} />
        </div>
        {this.extraPanel()}
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
