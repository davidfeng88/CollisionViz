import React from 'react';

import Header from './header/header';
import ControlPanelContainer from './control_panel_container';
import MapContainer from './map/map_container';

const App = () => {
  return (
    <div className='main'>
      <Header />
      <div className='bordered'>
        <ControlPanelContainer />
        <MapContainer />
      </div>
    </div>
  );
};

export default App;
