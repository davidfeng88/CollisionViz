import React from 'react';
import PropTypes from 'prop-types';
import CreditsModal from './CreditsModal';

const ModalSwitcher = ({ isModalOn, flipModal }) => (
  isModalOn ? <CreditsModal flipModal={flipModal} /> : null
);

export default ModalSwitcher;

ModalSwitcher.propTypes = {
  isModalOn: PropTypes.bool.isRequired,
  flipModal: PropTypes.func.isRequired,
};
