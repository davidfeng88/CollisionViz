import React from 'react';
import { connect } from 'react-redux';
import { collisionsToArray } from '../../reducers/selectors';
import parseTime from '../../util/time_util';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),

  start: state.filters.start,
  finish: state.filters.finish,
});

const timeLine = (start, finish) => {
  return(
    `${parseTime(start)} - ${parseTime(finish)}`
  );
};

const MapInfo = ({ start, finish, collisions }) => (
  <div>
    Current Map Time: <b>{parseTime(finish)}</b>
    <br />
    Showing Collisions During&nbsp;
    <b>{timeLine(start, finish)}</b>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
