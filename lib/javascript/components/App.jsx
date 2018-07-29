import React from 'react';

import Header from './header/Header';
import ControlPanelContainer from './control_panel_container';
import MapContainer from './map/map_container';

const App = () => (
  <div className="container">
    <Header />
    <div className="main bordered">
      <ControlPanelContainer />
      <MapContainer />
    </div>
  </div>
);

export default App;
