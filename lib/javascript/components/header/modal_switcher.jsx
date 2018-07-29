import React from 'react';

import AboutCollisionViz from './about_collision_viz';
import AboutMe from './about_me';
import Credits from './credits';

const ModalSwitcher = (props) => {
  switch (props.currentModal) {
    case 'AboutCollisionViz':
      return <AboutCollisionViz {...props} />;
    case 'AboutMe':
      return <AboutMe {...props} />;
    case 'Credits':
      return <Credits {...props} />;

    default:
      return null;
  }
};

export default ModalSwitcher;
