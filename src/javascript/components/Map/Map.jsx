/* global google:false */

import React from 'react';
import {
  fetchCollisionsFromApi,
  API_TIME_FIELD_NAME,
} from '../../api';
import initChart from './initChart';
import initHeatmap from './initHeatmap';

// Components
import Toggle from './Toggle';
import MapInfoContainer from './MapInfoContainer';
import ChartPlaceholder from './ChartPlaceholder';

// Utilities
import MarkerManager from './MarkerManager';
import {
  DEFAULT_HOUR,
  timeStringToHour,
} from '../../util';

const NYC_CENTER = {
  lat: 40.732663,
  lng: -73.993479,
};
const DEFAULT_ZOOM_LEVEL = 10;

class Map extends React.Component {
  state = {
    usingMarkerClusterer: true,
    collisionCount: 0, // for map info panel refresh
    // map layers
    heatmap: true,
  };

  componentDidMount = () => {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, {
      center: NYC_CENTER,
      zoom: DEFAULT_ZOOM_LEVEL,
      fullscreenControl: false,
    });
    this.MarkerManager = new MarkerManager(this.map);
    this.onNewDate(this.props.date);
  };

  onNewDate = (newDate) => {
    fetchCollisionsFromApi(newDate)
      .then((collisionsData) => {
        this.storeCollisionsForNewDate(collisionsData);
        this.props.updateFilter({
          loading: false,
        });
        this.updateMarkers(DEFAULT_HOUR);
        this.heatmap = initHeatmap(this.map, this.collisionsArray);
        initChart(this.collisions, this.props.updateFilter);
      });
  };

  storeCollisionsForNewDate = (collisionsData) => {
    this.collisions = {};
    this.collisionsArray = collisionsData;
    this.collisionsArray.forEach((collision) => {
      const hour = timeStringToHour(collision[API_TIME_FIELD_NAME]);
      if (hour in this.collisions) {
        this.collisions[hour].push(collision);
      } else {
        this.collisions[hour] = [collision];
      }
    });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.date !== this.props.date) {
      // if the date is changed, clear all markers, draw a new heatmap
      this.heatmap.setMap(null);
      this.MarkerManager.removeAllMarkers(this.state.usingMarkerClusterer);
      if (nextProps.date !== '') {
        this.onNewDate(nextProps.date);
      }
    } else {
      // only the hour is changed, add & remove markers
      this.updateMarkers(nextProps.hour);
    }
  };

  updateMarkers = (hour) => {
    this.setState({
      collisionCount: this.collisions[hour].length,
    });
    // filter the collisions based on start/finish/this.collisions
    this.MarkerManager.updateMarkers(
      this.collisions[hour],
      this.state.usingMarkerClusterer,
    );
  };

  toggleMarkerClusterer = () => {
    const { usingMarkerClusterer } = this.state;
    const newValue = !usingMarkerClusterer;
    this.setState({
      usingMarkerClusterer: newValue,
    });
    this.MarkerManager.toggleMarkerClusterer(newValue);
  };

  toggleHeatmap = () => {
    const { heatmap } = this.state;
    if (heatmap) {
      this.heatmap.setMap(null);
    } else {
      this.heatmap.setMap(this.map);
    }
    this.setState({
      heatmap: !heatmap,
    });
  };

  resetMapBorders = () => {
    this.map.setCenter(NYC_CENTER);
    this.map.setZoom(DEFAULT_ZOOM_LEVEL);
  };

  render = () => (
    <div>
      <div className="flex-row">
        <ChartPlaceholder />
      </div>
      <div className="flex-row">
        <b>
          3. Click on a marker for details
        </b>
      </div>
      <div className="flex-row">
        <Toggle
          label="Marker Clusterer"
          checked={this.state.usingMarkerClusterer}
          onChange={this.toggleMarkerClusterer}
        />
        <Toggle
          label="Heatmap"
          checked={this.state.heatmap}
          onChange={this.toggleHeatmap}
        />
        <div
          className="clickable-div bordered"
          onClick={this.resetMapBorders}
          onKeyDown={this.resetMapBorders}
        >
          Reset Map Borders
        </div>
      </div>
      <div className="index-map" ref="map">
        Map Placeholder
      </div>
      <div className="map-panel bordered flex-row">
        <MapInfoContainer count={this.state.collisionCount} />
      </div>
    </div>
  );
}

export default Map;
