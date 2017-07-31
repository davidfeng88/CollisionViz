import React from 'react';

import ModalTemplate from './modal_template';

const AboutCollisionViz = props => {
  return (
    <ModalTemplate {...props}>
      <h3>About CollisionViz</h3>
      <p>
        A visualization of motor vehicle collisions in NYC on 6/22/2017.
        <br />
        Click on markers for collision details.
      </p>
      <a href='https://github.com/davidfeng88/CollisionViz' target="_blank">
        GitHub Repo
      </a>
    </ModalTemplate>
  );
};

export default AboutCollisionViz;
