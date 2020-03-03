import React from 'react';
import PropTypes from 'prop-types';
import { RepoLink } from './HeaderLinks';
import ModalSwitcher from './ModalSwitcher';

const BackgroundSound = () => (
  <audio id="traffic" src="./assets/audio/traffic.mp3">
    <track kind="captions" />
  </audio>
);

const Logo = () => (
  <div className="logo">
    <img src="./assets/images/car-collision-favicon.svg" alt="" />
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
    <BackgroundSound />
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
