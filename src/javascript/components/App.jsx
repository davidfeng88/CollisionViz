import React from 'react';

import HeaderContainer from './Header/HeaderContainer';
import CollisionsFetcher from './CollisionsFetcher/CollisionsFetcher';

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
