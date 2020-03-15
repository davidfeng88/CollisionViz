import React from 'react';

import {
  fetchCollisionsFromApi,
  getCollisionHour,
} from './CollisionsDataAPI';

const FIRST_DATE_STRING = '2012-07-01';
const FIRST_DATE = new Date(FIRST_DATE_STRING);
const LAST_DATE = new Date();
LAST_DATE.setDate(LAST_DATE.getDate() - 10);
const LAST_DATE_STRING = LAST_DATE.toJSON().slice(0, 10);

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
      });
  };

  updateDate = (e) => {
    const dateString = e.currentTarget.value;
    const date = new Date(dateString);
    if (date < FIRST_DATE || date > LAST_DATE) {
      return;
    }
    const { updateAppState } = this.props;
    updateAppState({
      date: dateString,
      loading: true,
    });
  };

  render = () => {
    const { date } = this.props;
    return (
      <div>
        <div className="flex-row">
          <div>
            <label htmlFor="date">
              <b>
              1. Select Date
              </b>
              <br />
            Range:
              {' '}
              {FIRST_DATE_STRING}
              {' '}
~
              {' '}
              {LAST_DATE_STRING}
            </label>
            <input
              value={date}
              id="date"
              type="date"
              min={FIRST_DATE_STRING}
              max={LAST_DATE_STRING}
              onChange={this.updateDate}
            />
          </div>

        </div>
        <div className="flex-row">
          <b>
            2. Select Hour (click on bar)
          </b>
        </div>
      </div>
    );
  };
}

export default CollisionsFetcher;
