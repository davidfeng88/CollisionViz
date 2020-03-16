import React from 'react';
import PropTypes from 'prop-types';
import { RepoLink } from './HeaderLinks';
import ModalSwitcher from './ModalSwitcher';

const Logo = () => (
  <div className="logo">
    <img src="./assets/car-collision-favicon.svg" alt="" />
    <h1>
      CollisionViz
    </h1>
  </div>
);

const Links = ({ flipModal }) => (
  <div className="modal-buttons">
    <RepoLink />
    <br />
    <button type="button" onClick={flipModal}>
      Credits
    </button>
  </div>
);

const Header = ({ isModalOn, flipModal }) => (
  <header>
    <Logo />
    <Links
      flipModal={flipModal}
    />
    <ModalSwitcher
      isModalOn={isModalOn}
      flipModal={flipModal}
    />
  </header>
);

export default Header;

Header.propTypes = {
  isModalOn: PropTypes.bool.isRequired,
  flipModal: PropTypes.func.isRequired,
};

Links.propTypes = {
  flipModal: PropTypes.func.isRequired,
};
