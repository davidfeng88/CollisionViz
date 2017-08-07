import React from 'react';

const ModalTemplate = ({ closeModal, children }) => {
  return (
    <div onClick={closeModal} className="modal-backdrop">
      <div onClick={ e => e.stopPropagation() } className="modal">
        <div onClick={closeModal} className='close'>
          ×
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
