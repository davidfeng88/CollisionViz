import React from 'react';
import { connect } from 'react-redux';
import { collisionsToArray } from '../reducers/selectors';
import { updateHighlight } from '../actions/highlight_actions';
import MarkerManager from '../util/marker_manager';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
  taxi: state.filters.taxi,
  bike: state.filters.bike,
  motorcycle: state.filters.motorcycle,
});

const mapDispatchToProps = dispatch => ({
  updateHighlight: (collisionId) => dispatch(updateHighlight(collisionId)),
});

const mapOptions = {
  center: {
    lat: 40.732663,
    lng: -73.993479
  }, // NYC coords
  zoom: 10
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.toggleHeatmap = this.toggleHeatmap.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeGradient = this.changeGradient.bind(this);
    this.changeOpacity = this.changeOpacity.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);

    const heatmapData = [
      new google.maps.LatLng(40.73, -74)
    ];
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData
    });
    this.heatmap.setMap(this.map);
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
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }

  changeGradient() {
    let gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    this.heatmap.set(
      'gradient', this.heatmap.get('gradient') ? null : gradient);
  }

  changeRadius() {
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
  }

  changeOpacity() {
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
