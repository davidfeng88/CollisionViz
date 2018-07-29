import React from 'react';
import Credits from './Credits';

const CreditsModal = ({
  isModalOn,
  closeModel,
}) => (isModalOn ? (
  <div onClick={closeModel} className="modal-backdrop">
    <div onClick={e => e.stopPropagation()} className="modal">
      <div onClick={closeModel} className="modal-close-x">
          ×
      </div>
      <Credits />
    </div>
  </div>
) : null);

export default CreditsModal;
