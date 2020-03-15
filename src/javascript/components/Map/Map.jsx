import React from 'react';

import drawHeatmap from './GoogleHeatmapAPI';
import MarkerManager from './MarkerManager';
import Toggle from './Toggle';
// import MapInfo from './MapInfo';

const { google } = window;

const NYC_CENTER = {
  lat: 40.732663,
  lng: -73.993479,
};
const DEFAULT_ZOOM_LEVEL = 10;

class Map extends React.Component {
  state = {
    usingMarkerClusterer: true,
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
  };

  componentWillReceiveProps = (nextProps) => {
    /* loading changes from true to false
      => new collisions from a new date received
      => need to redraw the markers and heatmap
    */
    const { loading } = this.props;
    if (loading && !nextProps.loading) {
      this.MarkerManager.removeAllMarkers(this.state.usingMarkerClusterer);
      this.updateMarkers(nextProps.collisions[nextProps.hour]);
      if (typeof this.heatmap !== 'undefined') {
        this.heatmap.setMap(null);
      }
      this.heatmap = drawHeatmap(this.map, nextProps.collisions);

      // } else {
      //  // TODO: confirm if we need this if else
      // }
    } else {
      this.updateMarkers(nextProps.collisions[nextProps.hour]);
    }
  };

  updateMarkers = (collisionsInAnHour) => {
    this.MarkerManager.updateMarkers(
      collisionsInAnHour,
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
          label="Heatmap (All Day)"
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
      {/* <div className="map-panel bordered flex-row">
        <MapInfo
          count={this.state.collisionCount}
          date={this.props.date}
          hour={this.props.hour}
        />
      </div> */}
    </div>
  );
}

export default Map;
