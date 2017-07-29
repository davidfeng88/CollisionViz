import React from 'react';

import ControlPanelContainer from './control_panel_container';
import MapContainer from './map_container';
import HighlightContainer from './highlight_container';

const App = () => {
  return (
    <div className='container'>
      <audio id='traffic' src={window.staticSounds.traffic}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <header>
        <div className='logo'>
          <img src={window.staticImages.logo} />
          <h1>CollisionViz</h1>
        </div>
        <div className='header-links'>
          <a>About CollisionViz</a>
          <a>About Me</a>
          <a>Credits</a>
        </div>
      </header>
      <ControlPanelContainer />
      <MapContainer />
      <HighlightContainer />
    </div>
  );
};

export default App;

// about CollisionViz
// <h3>
// A visualization of motor vehicle collisions
// in NYC on 6/22/2017.<br />
// Click on markers for collision details.</h3>
// <div className='github-repo'>
// <a href='https://github.com/davidfeng88/CollisionViz' target="_blank">
// GitHub Repo
// </a>
// </div>

// about me
// <div className='links'>
// <a href='https://davidfeng.us/' target="_blank">
// <i className="fa fa-user fa-lg" aria-hidden="true"></i>
// </a>
// <a href='https://github.com/davidfeng88' target="_blank">
// <i className="fa fa-github fa-lg" aria-hidden="true"></i>
// </a>
// <a href='https://www.linkedin.com/in/gfeng/' target="_blank">
// <i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i>
// </a>
// <a href='https://angel.co/ge-david-feng' target="_blank">
// <i className="fa fa-angellist fa-lg" aria-hidden="true"></i>
// </a>
//
// </div>
