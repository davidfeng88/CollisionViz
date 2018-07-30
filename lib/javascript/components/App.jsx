import React from 'react';

import HeaderContainer from './Header/HeaderContainer';
import ControlPanelContainer from './ControlPanel/ControlPanelContainer';
import MapContainer from './map/map_container';

const App = () => (
  <div className="container">
    <HeaderContainer />
    <div className="main bordered">
      <ControlPanelContainer />
      <MapContainer />
    </div>
  </div>
);

export default App;
