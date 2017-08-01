import React from 'react';
import { connect } from 'react-redux';

import * as APIUtil from '../../util/collision_api_util';
import { collisionsToArray } from '../../reducers/selectors';
import { updateHighlight } from '../../actions/highlight_actions';
import { updateFilter } from '../../actions/filter_actions';

import Toggle from '../toggle';
import MapInfoContainer from './map_info_container';
import MarkerManager from '../../util/marker_manager';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
  updateHighlight: (collisionId) => dispatch(updateHighlight(collisionId)),
});

const NYC_CENTER = {lat: 40.732663, lng: -73.993479};
const DEFAULT_ZOOM_LEVEL = 10;

const mapOptions = {
  center: NYC_CENTER,
  zoom: DEFAULT_ZOOM_LEVEL,
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // special icons
      taxi: true,
      bike: true,
      motorcycle: true,
      ped: true,

      // map layers
      heatmap: true,
      traffic: false,
      transit: false,
      bicycling: false,
    };

    this.resetMap = this.resetMap.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleClick.bind(this));
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat:south, lng: west },
      };
      this.props.updateFilter({bounds: bounds});
    });
    this.MarkerManager.updateMarkers(
      this.props.collisions,
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
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
  }

  componentWillReceiveProps(newProps) {
    this.MarkerManager.updateMarkers(
      newProps.collisions,
      this.state.taxi,
      this.state.bike,
      this.state.motorcycle,
      this.state.ped
    );
  }

  handleClick(collision) {
    this.props.updateHighlight(collision.id);
  }

  toggleIcon(field) {
    return e => {
      let newValue = !this.state[field];
      this.setState({ [field]: !this.state[field] });
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

  resetMap() {
    this.map.setCenter(NYC_CENTER);
    this.map.setZoom(DEFAULT_ZOOM_LEVEL);
  }

  render() {
    return (
      <div>
        <div className='control-panel'>
          <table className='icons'>
            <thead>
              <tr>
                <th><img src={window.staticImages.taxi} />
                &nbsp;Taxi</th>
                <th><img src={window.staticImages.bike} />
                &nbsp;Bicycle</th>
                <th><img src={window.staticImages.motorcycle} />
                &nbsp;Motorcycle</th>
                <th><img src={window.staticImages.ped} />
                &nbsp;Pedestrian</th>
                <th>Heatmap</th>
                <th>Real-time traffic</th>
                <th>Public transit</th>
                <th>Bicycling</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Toggle checked={this.state.taxi}
                    onChange={this.toggleIcon('taxi')} />
                </td>
                <td>
                  <Toggle checked={this.state.bike}
                    onChange={this.toggleIcon('bike')} />
                </td>
                <td>
                  <Toggle checked={this.state.motorcycle}
                    onChange={this.toggleIcon('motorcycle')} />
                </td>
                <td>
                  <Toggle checked={this.state.ped}
                    onChange={this.toggleIcon('ped')} />
                </td>
                <td>
                  <Toggle checked={this.state.heatmap}
                    onChange={() => this.toggleMapLayer('heatmap')} />
                </td>
                <td>
                  <Toggle checked={this.state.traffic}
                    onChange={() => this.toggleMapLayer('traffic')} />
                </td>
                <td>
                  <Toggle checked={this.state.transit}
                    onChange={() => this.toggleMapLayer('transit')} />
                </td>
                <td>
                  <Toggle checked={this.state.bicycling}
                    onChange={() => this.toggleMapLayer('bicycling')} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className='clickable-div border' onClick={this.resetMap}>
            Reset Map
          </div>
        </div>
      <MapInfoContainer />
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
