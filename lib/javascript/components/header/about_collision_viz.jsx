import React from 'react';

import ModalTemplate from './modal_template';

const AboutCollisionViz = props => (
  <ModalTemplate {...props}>
    <h3>About CollisionViz</h3>
    <p className='modal-row'>
      CollisionViz is a data visualization web app
      for motor vehicle collisions in New York City.
    </p>
    <p className='modal-row'>
      1. Select the date.
    </p>
    <p className='modal-row'>
      2. Select the start time by using the input box or clicking on the chart bars.
    </p>
    <p className='modal-row'>
      3. Start/pause the visualization. Click on markers for collision details.
    </p>
    <div className='flex-row'>
      <a href='https://github.com/davidfeng88/CollisionViz' target='_blank'>
        GitHub Repo
      </a>
    </div>
  </ModalTemplate>
);

export default AboutCollisionViz;
