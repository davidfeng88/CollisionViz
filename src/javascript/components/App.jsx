import React from 'react';

import HeaderContainer from './Header/HeaderContainer';
import CollisionsFetcher from './CollisionsFetcher/CollisionsFetcher';
import ChartContainer from './Chart/ChartContainer';

import Map from './Map/Map';

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
        loading={loading}
        collisions={collisions}
        updateAppState={updateAppState}
      />
      {/* <Map
        collisions={collisions}
        date={date}
        hour={hour}
        loading={loading}
        updateAppState={updateAppState}
      /> */}
    </div>
  </div>
);

export default App;
