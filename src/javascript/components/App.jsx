import React from 'react';

import HeaderContainer from './Header/HeaderContainer';
import CollisionsFetcher from './CollisionsFetcher/CollisionsFetcher';
import ChartContainer from './Chart/ChartContainer';
import Map from './Map/Map';
import MapInfo from './MapInfo';

const App = ({
  collisions, date, hour, loading, updateAppState,
}) => (
  <div className="container">
    <HeaderContainer />
    <div className="main bordered">
      <CollisionsFetcher
        date={date}
        updateAppState={updateAppState}
      />
      <ChartContainer
        collisions={collisions}
        loading={loading}
        updateAppState={updateAppState}
      />
      <Map
        collisions={collisions}
        hour={hour}
        loading={loading}
      />
      <MapInfo
        date={date}
        hour={hour}
        collisions={collisions}
      />
    </div>
  </div>
);

export default App;
