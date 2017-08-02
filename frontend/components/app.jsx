import React from 'react';

import Header from './header/header';
import ControlPanelContainer from './control_panel/control_panel_container';
import MapContainer from './map/map_container';
import HighlightContainer from './highlight_container';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <ControlPanelContainer />
      <MapContainer />
      <HighlightContainer />
    </div>
  );
};

export default App;
