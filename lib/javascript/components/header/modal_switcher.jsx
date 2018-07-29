import React from 'react';

import Credits from './Credits';

const ModalSwitcher = (props) => {
  switch (props.currentModal) {
    case 'Credits':
      return <Credits {...props} />;
    default:
      return null;
  }
};

export default ModalSwitcher;
