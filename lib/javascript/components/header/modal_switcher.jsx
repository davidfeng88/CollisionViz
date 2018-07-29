import React from 'react';

import ModalTemplate from './modal_template';

const ModalSwitcher = (props) => {
  switch (props.currentModal) {
    case 'Credits':
      return <ModalTemplate {...props} />;
    default:
      return null;
  }
};

export default ModalSwitcher;
