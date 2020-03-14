import React from 'react';

const MapInfo = ({
  date, hour, count,
}) => (
  <div className="map-info">
    Date:
    {' '}
    <strong>
      {date}
    </strong>
    {' '}
    <br />
    Showing
    {' '}
    {count}
    {' '}
Collision(s) During&nbsp;
    <strong>
      {hour}
:00 -
      {' '}
      {hour}
:59
    </strong>
  </div>
);

export default MapInfo;
