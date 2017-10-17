import React from 'react';

const ModalTemplate = ( {
  closeModal,
  children
} ) => (
  <div onClick={closeModal} className='modal-backdrop'>
    <div onClick={ e => e.stopPropagation() } className='modal'>
      <div onClick={closeModal} className='modal-close-x'>
        ×
      </div>
      {children}
    </div>
  </div>
);

export default ModalTemplate;
