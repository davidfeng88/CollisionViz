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
    Current Map Time: <span className='bold'>{parseTime(finish)}</span>
    <br />
    <span className='bold'>{collisions.length}</span> collision(s) on map during&nbsp;
    <span className='bold'>{timeLine(start, finish)}</span>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
