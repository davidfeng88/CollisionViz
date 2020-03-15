import React from 'react';

const MapInfo = ({
  date, hour, collisions,
}) => (
  <div className="map-panel bordered flex-row">
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
      {collisions[hour] ? collisions[hour].length : 0}
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
  </div>
);

export default MapInfo;
