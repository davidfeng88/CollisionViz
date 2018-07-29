import React from 'react';
import Credits from './Credits';

const ModalTemplate = ({
  closeModal,
}) => (
  <div onClick={closeModal} className="modal-backdrop">
    <div onClick={e => e.stopPropagation()} className="modal">
      <div onClick={closeModal} className="modal-close-x">
        ×
      </div>
      <Credits />
    </div>
  </div>
);

export default ModalTemplate;
