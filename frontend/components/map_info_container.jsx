import React from 'react';
import { connect } from 'react-redux';
import { collisionsToArray } from '../reducers/selectors';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
  start: state.options.start,
  finish: state.options.finish,
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
  <div className='map-info'>
  Current Map Time: {parseTime(finish)}
  <br />
  {collisions.length} collision(s) on map during&nbsp;
  {timeLine(start, finish)}
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
