import React from 'react';
import { connect } from 'react-redux';
import { timeIntToString } from '../../util';

const mapStateToProps = state => ({
  date: state.date,
  start: state.start,
  finish: state.finish,
});

const timeLine = (start, finish) => (
  `${timeIntToString(start)} - ${timeIntToString(finish)}`
);

const MapInfo = ({ date, start, finish, count }) => (
  <div className='map-info'>
    Date: <strong>{date}</strong> Map Time:&nbsp;
    <strong>{timeIntToString(finish)}</strong>
    <br />
    Showing {count} Collision(s) During&nbsp;
    <strong>{timeLine(start, finish)}</strong>
  </div>
);

export default connect(
  mapStateToProps,
  null
)(MapInfo);
