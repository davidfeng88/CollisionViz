import React from 'react';
import {
  fetchCollisionsFromApi,
  API_TIME_FIELD_NAME,
} from '../../api';

import {
  initHeatmap,
  updateHeatmap,
} from './Heatmap';

// Components
import Toggle from '../toggle';
import MapInfoContainer from './map_info_container';
import Chart from './Chart';

// Utilities
import MarkerManager from './marker_manager';
import {
  DEFAULT_TIME,
  START_TIME,
  END_TIME,
  timeStringToInt,
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

    this.fetchCollisions(this.props.date, true);
  }

  fetchCollisions = (date, firstFetch = false) => {
    this.collision = fetchCollisionsFromApi(date)
      .then((collisionsData) => {
        this.collisions = {};
        const validCollisions = collisionsData.filter(collision => collision.latitude && collision.longitude && collision[API_TIME_FIELD_NAME]);
        validCollisions.forEach((collision) => {
          const time = timeStringToInt(collision[API_TIME_FIELD_NAME]);
          // if (this.collisions[time]) {
          if (time in this.collisions) {
            this.collisions[time].push(collision);
          } else {
            this.collisions[time] = [collision];
          }
        });
        this.props.updateFilter({
          loading: false,
        });
        this.updateMarkers(DEFAULT_TIME, DEFAULT_TIME);
        if (firstFetch) {
          this.heatmap = initHeatmap(this.map, validCollisions);
        } else {
          updateHeatmap(this.heatmap, this.map, validCollisions);
        }
        this.initChart();
      });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.date !== this.props.date) {
      // if the date is changed, clear all markers, draw a new heatmap
      this.heatmap.setMap(null);
      this.MarkerManager.removeAllMarkers(this.state.usingMarkerClusterer);
      if (nextProps.date !== '') {
        this.fetchCollisions(nextProps.date);
      }
    } else {
      // only the time is updated, add & remove markers
      this.updateMarkers(nextProps.start, nextProps.finish);
    }
  }

  updateMarkers = (start, finish) => {
    let collisionsArray = [];
    for (let time = start; time <= finish; time++) {
      if (time in this.collisions) {
        // if (collisions[time]) will treat undefined the same as other
        // falsey values: false, 0, -0, "", '', null, NaN
        collisionsArray = collisionsArray.concat(this.collisions[time]);
      }
    }
    this.setState({
      collisionCount: collisionsArray.length,
    });
    // filter the collisions based on start/finish/this.collisions
    this.MarkerManager.updateMarkers(
      collisionsArray,
      this.state.usingMarkerClusterer,
    );
  }

  initChart = () => {
    google.charts.load('current', {
      packages: ['corechart'],
    });
    google.charts.setOnLoadCallback(() => {
      const data = new google.visualization.DataTable();
      data.addColumn({
        type: 'timeofday',
        label: 'Time',
      });
      data.addColumn({
        type: 'number',
        label: 'Without Injuries/Deaths',
      });
      data.addColumn({
        type: 'number',
        label: 'With Injuries',
      });
      data.addColumn({
        type: 'number',
        label: 'With Deaths',
      });
      let noInjuries = 0;
      let injuries = 0;
      let deaths = 0;
      let totalCount = 0;
      for (let time = START_TIME; time <= END_TIME; time++) {
        if (time in this.collisions) {
          // if (this.collisions[time]) will treat undefined the same as other
          // falsey values: false, 0, -0, "", '', null, NaN
          this.collisions[time].forEach((collision) => {
            if (collision.number_of_persons_killed > 0) {
              deaths += 1;
            } else if (collision.number_of_persons_injured > 0) {
              injuries += 1;
            } else {
              noInjuries += 1;
            }
          });
        }
        if (time % 60 === 59) {
          const hour = Math.floor(time / 60);
          const label = `${hour.toString()}:00 - ${(hour)
            .toString()}:59`;
          data.addRow([{
            v: [hour, 30, 0],
            f: label,
          },
          noInjuries, injuries, deaths,
          ]);
          totalCount += noInjuries + injuries + deaths;
          noInjuries = 0;
          injuries = 0;
          deaths = 0;
        }
      }
      const title = `Time Distribution of ${totalCount.toString()
      } Collisions on ${this.props.date
      }\n (click on bar to update time)`;
      const options = {
        animation: {
          startup: true,
          duration: 300,
        },
        chartArea: {
          width: '90%',
        },
        colors: ['#4285f4', '#f4b400', '#db4437'],
        width: 500,
        height: 300,
        hAxis: {
          baselineColor: 'white',
          gridlines: {
            color: 'white',
          },
        },
        vAxis: {
          ticks: [0, 20, 40, 60],
        },
        fontSize: 14,
        title,
        legend: {
          position: 'top',
          maxLines: 5,
        },
        isStacked: true,
        bar: {
          groupWidth: '100%',
        },
      };
      const chart = new google.visualization
        .ColumnChart(document.getElementById('chart-div'));

      const selectHandler = () => {
        const selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          const newTime = selectedItem.row * 60;
          this.props.updateFilter({
            start: newTime,
            finish: newTime,
            initialTime: newTime,
          });
        }
      };

      google.visualization.events
        .addListener(chart, 'select', selectHandler);

      chart.draw(data, options);
    });
  }

  toggle = (field) => {
    return (e) => {
      const newValue = !this.state[field];
      this.setState({
        [field]: !this.state[field],
      });
      switch (field) {
        case 'usingMarkerClusterer':
          this.MarkerManager.toggleMarkerClusterer(newValue);
          break;
        default:
      }
    };
  }

  toggleMapLayer = (field) => {
    return (e) => {
      if (this.state[field]) {
        this[field].setMap(null);
        this.setState({
          [field]: false,
        });
      } else {
        this[field].setMap(this.map);
        this.setState({
          [field]: true,
        });
      }
    };
  }

  resetMapBorders = () => {
    this.map.setCenter(NYC_CENTER);
    this.map.setZoom(DEFAULT_ZOOM_LEVEL);
  }

  extraPanel = () => (
    <div>
      <div className="flex-row">
        <Toggle
          label="Marker Clusterer"
          checked={this.state.usingMarkerClusterer}
          onChange={this.toggle('usingMarkerClusterer')}
        />
        <Toggle
          label="Heatmap"
          checked={this.state.heatmap}
          onChange={this.toggleMapLayer('heatmap')}
        />
      </div>
    </div>
  );

  render = () => (
    <div>

      {this.extraPanel()}
      <div className="flex-row">
        <Chart />
      </div>
      <div className="index-map" ref="map">
        Map Placeholder
      </div>
      <div className="map-panel bordered flex-row">
        <MapInfoContainer count={this.state.collisionCount} />
        <div
          className="clickable-div bordered"
          onClick={this.resetMapBorders}
        >
          Reset Map Borders
        </div>
      </div>
    </div>
  );
}

export default Map;
