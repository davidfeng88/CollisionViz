import React from 'react';

const ModalTemplate = ({ closeModal, children }) => {
  return (
    <div onClick={closeModal} className="modal-backdrop">
      <div onClick={ e => e.stopPropagation() } className="modal">
        {children}
        <div className="footer">
          <button onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

};

export default ModalTemplate;
