import React from 'react';

import HeaderContainer from './Header/HeaderContainer';
import ControlPanel from './ControlPanel/ControlPanel';
import Map from './Map/Map';

const App = ({
  date, hour, loading, updateAppState,
}) => (
  <div className="container">
    <HeaderContainer />
    <div className="main bordered">
      <ControlPanel
        date={date}
        updateAppState={updateAppState}
      />
      <Map
        date={date}
        hour={hour}
        loading={loading}
        updateAppState={updateAppState}
      />
    </div>
  </div>
);

export default App;
