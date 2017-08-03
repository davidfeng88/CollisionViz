import React from 'react';
import { connect } from 'react-redux';
import { collisionsToArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
  start: state.filters.start,
  finish: state.filters.finish,
});

const parseTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60).toString();
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  let minutes = (totalMinutes % 60).toString();
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

const timeLine = (start, finish) => {
  return(
    `${parseTime(start)} - ${parseTime(finish)}`
  );
};

const MapInfo = ({ start, finish, collisions }) => (
  <div>
    Current Map Time: <b>{parseTime(finish)}</b>
    <br />
    <b>{collisions.length}</b> collision(s) on map during&nbsp;
    <b>{timeLine(start, finish)}</b>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
