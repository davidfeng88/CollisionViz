import React from 'react';
import PropTypes from 'prop-types';
import Credits from './Credits';

const CreditsModal = ({ flipModal }) => (
  <div role="button" onKeyDown={flipModal} onClick={flipModal} tabIndex={0} className="modal-backdrop">
    <div role="button" onKeyDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()} tabIndex={0} className="modal">
      <div role="button" onKeyDown={flipModal} onClick={flipModal} tabIndex={0} className="modal-close-x">
        ×
      </div>
      <Credits />
    </div>
  </div>
);

export default CreditsModal;

CreditsModal.propTypes = {
  flipModal: PropTypes.func.isRequired,
};
