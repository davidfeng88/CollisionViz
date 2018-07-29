import React from 'react';
import { RepoLink } from './HeaderLinks';
import ModalSwitcher from './modal_switcher';

export default class Header extends React.Component {
  state = {
    currentModal: '',
  };

  switchModal = modalName => ((e) => {
    e.preventDefault();
    this.setState({
      currentModal: modalName,
    });
  });

  render = () => {
    const { currentModal } = this.state;
    return (
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
          <button type="button" onClick={this.switchModal('Credits')}>
              Credits
          </button>
        </div>
        <ModalSwitcher
          currentModal={currentModal}
          closeModal={this.switchModal('')}
        />
      </header>
    );
  };
}
