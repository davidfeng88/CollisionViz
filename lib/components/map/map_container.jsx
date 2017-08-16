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
  collisionsArrayToAdd: collisionsToArray(state, state.filters.finish),
  collisionsArrayToRemove: collisionsToArray(state, state.filters.start - 1),
  date: state.filters.date
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
});

const NYC_CENTER = {lat: 40.732663, lng: -73.993479};
const DEFAULT_ZOOM_LEVEL = 10;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.resetMapBorders = this.resetMapBorders.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, {
      center: NYC_CENTER,
      zoom: DEFAULT_ZOOM_LEVEL,
    });
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.createMarkers(
      this.props.collisionsArrayToAdd,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
    this.traffic = new google.maps.TrafficLayer();
    this.transit = new google.maps.TransitLayer();
    this.bicycling = new google.maps.BicyclingLayer();
    this.updateHeatmap(this.props.date, true);
  }

  updateHeatmap(date, createHeatmap = false) {
    let heatmapData = [];
    APIUtil.fetchCollisions(date)
      .then( collisionsData => {
        collisionsData.forEach( collision => {
          if (collision.latitude && collision.longitude) {
            // some data does not have these information
            let lat = collision.latitude;
            let lng = collision.longitude;
            heatmapData.push(new google.maps.LatLng(lat, lng));
          }
        });
        if (createHeatmap) {
          // don't use "let"
          this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: 10,
            maxIntensity: 3,
            map: this.map
          });
        } else {
          this.heatmap.setData(heatmapData);
          this.heatmap.setMap(this.map);
        }
      }
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.date !== this.props.date) {
      // if the date is changed, clear all markers, draw a new heatmap
      this.heatmap.setMap(null);
      this.MarkerManager.removeAllMarkers();
      if (newProps.date !== "") {
        this.updateHeatmap(newProps.date);
      }
    } else {
      // only the time is updated, add & remove markers
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

  toggleMapLayer(field) {
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
