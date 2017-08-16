import React from 'react';
import { connect } from 'react-redux';
import { timeIntToString } from '../../util/time_util';

const mapStateToProps = state => ({
  date: state.date,
  start: state.start,
  finish: state.finish,
});

const timeLine = (start, finish) => {
  return(
    `${timeIntToString(start)} - ${timeIntToString(finish)}`
  );
};

const MapInfo = ({ date, start, finish, collisions }) => (
  <div className='map-info'>
    Map Time: <b>{date} {timeIntToString(finish)}</b>
    <br />
    Showing Collisions During&nbsp;
    <b>{timeLine(start, finish)}</b>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
