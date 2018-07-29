import React from 'react';
import { RepoLink } from './HeaderLinks';
import ModalSwitcher from './modal_switcher';

const Header = ({ currentModal, switchModal }) => (
  <header>
    <audio id="traffic" src="./assets/sounds/traffic.mp3">
      <track kind="captions" />
    </audio>
    <div className="logo">
      <img src="./assets/images/car-collision-favicon.svg" alt="" />
      <h1>
        CollisionViz
      </h1>
    </div>
    <div className="modal-buttons">
      <RepoLink />
      <br />
      <button type="button" onClick={switchModal('Credits')}>
          Credits
      </button>
    </div>
    <ModalSwitcher
      currentModal={currentModal}
      closeModal={switchModal('')}
    />
  </header>
);

export default Header;
