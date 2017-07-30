import React from 'react';

const Modal = ({ closeModal, show, children }) => {
  if (show) {
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
  } else {
    return null;
  }
};

export default Modal;
