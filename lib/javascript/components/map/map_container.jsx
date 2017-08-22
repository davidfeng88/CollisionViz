import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { updateFilter } from '../../actions';
// Components
import Toggle from '../toggle';
import MapInfoContainer from './map_info_container';
// Constants
import alternativeMapStyle from './styles';
import { DEFAULT_TIME } from '../../reducer';
// Utilities
import MarkerManager from './marker_manager';
import { fetchCollisions, timeStringToInt } from '../../util';

const mapStateToProps = ({start, finish, date}) => ({
  start, finish, date,});

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
      fullscreenControl: false,
    });
    this.MarkerManager = new MarkerManager(this.map);

    this.traffic = new google.maps.TrafficLayer();
    this.transit = new google.maps.TransitLayer();
    this.bicycling = new google.maps.BicyclingLayer();
    this.fetchCollisions(this.props.date, true);
  }

  fetchCollisions(date, createHeatmap = false) {
    fetchCollisions(date)
      .then( collisionsData => {
        this.collisions = {};
        let validCollisions = collisionsData.filter(collision =>
          collision.latitude && collision.longitude && collision.time);
        validCollisions.forEach(collision => {
          let index = timeStringToInt(collision.time);
          if (this.collisions[index]) {
            this.collisions[index].push(collision);
          } else {
            this.collisions[index] = [collision];
          }
        });
        this.props.updateFilter({ loaded: true });
        this.updateMarkers(DEFAULT_TIME, DEFAULT_TIME, this.collisions);

        let heatmapData = validCollisions.map(collision =>
          new google.maps.LatLng(collision.latitude, collision.longitude));
        if (createHeatmap) {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      // if the date is changed, clear all markers, draw a new heatmap
      this.heatmap.setMap(null);
      this.MarkerManager.removeAllMarkers();
      if (nextProps.date !== '') {
        this.fetchCollisions(nextProps.date);
      }
    } else {
      // only the time is updated, add & remove markers
      this.updateMarkers(nextProps.start, nextProps.finish, this.collisions);
    }
  }

  updateMarkers(start, finish, collisions) {
    let collisionsArray = [];
    for (let time = start; time <= finish; time++) {
      if (collisions[time]) {
        collisionsArray = collisionsArray.concat(collisions[time]);
      }
    }
    // filter the collisions based on start/finish/this.collisions
    this.MarkerManager.updateMarkers(
      collisionsArray,
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

  toggleMapLayer(field) {
    return e => {
      if (this.state[field]) {
        this[field].setMap(null);
        this.setState({[field]: false});
      } else {
        this[field].setMap(this.map);
        this.setState({[field]: true});
      }
    };
  }

  resetMapBorders() {
    this.map.setCenter(NYC_CENTER);
    this.map.setZoom(DEFAULT_ZOOM_LEVEL);
  }

  extraPanel() {
    let extraPanel = null;
    if (this.state.showExtra) {
      extraPanel = (
        <div>
          <div className='flex-row'>
            <strong>Toggle Custom Markers</strong>
          </div>
          <div className='flex-row'>
            <Toggle
              label='Taxi'
              checked={this.state.taxi}
              onChange={this.toggle('taxi')} />
            <Toggle
              label='Bike'
              checked={this.state.bike}
              onChange={this.toggle('bike')} />
            <Toggle
              label='Motorcycle'
              checked={this.state.motorcycle}
              onChange={this.toggle('motorcycle')} />
            <Toggle
              label='Pedestrian'
              checked={this.state.ped}
              onChange={this.toggle('ped')} />
          </div>
          <div className='flex-row'>
            <strong>Toggle Map Layers</strong>
          </div>
          <div className='flex-row'>
            <Toggle
              label='Heatmap'
              checked={this.state.heatmap}
              onChange={this.toggleMapLayer('heatmap')} />
            <Toggle
              label='Traffic'
                checked={this.state.traffic}
              onChange={this.toggleMapLayer('traffic')} />
            <Toggle
              label='Transit'
              checked={this.state.transit}
              onChange={this.toggleMapLayer('transit')} />
            <Toggle
              label='Bicycling'
              checked={this.state.bicycling}
              onChange={this.toggleMapLayer('bicycling')} />
          </div>
          <div className='flex-row'>
            <Toggle
              label='Alternative Map Style'
              checked={this.state.alternativeMapStyle}
              onChange={this.toggle('alternativeMapStyle')} />
          </div>
        </div>
      );
    }
    return(
      <ReactCSSTransitionGroup
        transitionName='extra'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
        >
        {extraPanel}
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    return (
      <div>
        <div className='flex-row'>
          <Toggle
            label='Map Options'
            checked={this.state.showExtra}
            onChange={this.toggle('showExtra')} />
        </div>
        {this.extraPanel()}
        <div className='index-map' ref='map'>
          Map
        </div>
        <div className='map-panel bordered flex-row'>
          <MapInfoContainer />
          <div className='clickable-div bordered'
            onClick={this.resetMapBorders}>
            Reset Map Borders
          </div>
        </div>
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
