import React from 'react';

const Modal = ({ toggleModal, show, children }) => {
  if (show) {
    return (
      <div onClick={toggleModal} className="modal-backdrop">
        <div onClick={ e => e.stopPropagation() } className="modal">
          {children}
          <div className="footer">
            <button onClick={toggleModal}>
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
