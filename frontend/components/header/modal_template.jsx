import React from 'react';

const ModalTemplate = ({ closeModal, children }) => {
  return (
    <div onClick={closeModal} className="modal-backdrop">
      <div onClick={ e => e.stopPropagation() } className="modal">
        <button onClick={closeModal} className='close-modal'>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
