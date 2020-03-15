import React from 'react';

import DateSelector from './DateSelector';
import Chart from './Chart';

import {
  fetchCollisionsFromApi,
  getCollisionHour,
} from './CollisionsDataAPI';
import initChart from './GoogleChartAPI';

const parseCollisionsForNewDate = (collisionsData) => {
  const collisions = {};
  collisionsData.forEach((collision) => {
    const hour = getCollisionHour(collision);
    if (hour in collisions) {
      collisions[hour].push(collision);
    } else {
      collisions[hour] = [collision];
    }
  });
  return collisions;
};

class CollisionsFetcher extends React.Component {
  componentDidMount = () => {
    const { date } = this.props;
    this.onNewDate(date);
  };

  componentWillReceiveProps = (nextProps) => {
    const { date } = this.props;
    if (nextProps.date !== date) {
      this.onNewDate(nextProps.date);
    }
  };

  onNewDate = (newDate) => {
    fetchCollisionsFromApi(newDate)
      .then((collisionsData) => {
        const { updateAppState } = this.props;
        const collisions = parseCollisionsForNewDate(collisionsData);
        updateAppState({
          loading: false,
          collisions,
        });
        initChart(collisions, updateAppState);
      });
  };

  updateDate = (e) => {
    const { updateAppState } = this.props;
    updateAppState({
      date: e.currentTarget.value,
      loading: true,
    });
  };

  render = () => {
    const { date } = this.props;
    return (
      <div>
        <div className="flex-row">
          <DateSelector
            date={date}
            onChange={this.updateDate}
          />
        </div>
        <div className="flex-row">
          <b>
            2. Select Hour (click on bar)
          </b>
        </div>
        <div className="flex-row">
          <Chart />
        </div>
      </div>
    );
  };
}

export default CollisionsFetcher;
