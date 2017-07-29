import React from 'react';

const Header = () => {
  return (
    <header>
      <audio id='traffic' src={window.staticSounds.traffic}>
        Your browser does not support the <code>audio</code> element.
      </audio>
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
  );
};

export default Header;
