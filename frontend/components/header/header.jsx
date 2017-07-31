import React from 'react';

import ModalTemplate from './modal_template';

import ModalSwitcher from './modal_switcher';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentModal: "" };
    this.switchModal = this.switchModal.bind(this);
  }

  switchModal(modalName) {
    return ( e => {
      e.preventDefault();
      this.setState({currentModal: modalName});
    });
  }

  render() {
    return (
      <header>
        <audio id='traffic' src={window.staticSounds.traffic}>
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div className='logo'>
          <img src={window.staticImages.logo} />
          <h1>CollisionViz</h1>
        </div>
        <div className='header-links'>
          <button onClick={this.switchModal("AboutCollisionViz")}>
            About CollisionViz
          </button>
          <br />
          <button onClick={this.switchModal("AboutMe")}>
            About Me
          </button>
          <br />
          <button onClick={this.switchModal("Credits")}>
            Credits
          </button>
        </div>

        <ModalSwitcher
          currentModal={this.state.currentModal}
          closeModal={this.switchModal("")}
        />

      </header>
    );
  }
}

export default Header;

// phase 1
// <Modal show={this.state.currentModal === 'AboutCollisionViz'}
//   closeModal={this.switchModal("")} >
//   This is AboutCollisionViz Modal
// </Modal>
// <Modal show={this.state.currentModal === 'AboutMe'}
//   closeModal={this.switchModal("")} >
//   This is AboutMe Modal
// </Modal>
// <Modal show={this.state.currentModal === 'Credits'}
//   closeModal={this.switchModal("")} >
//   This is Credits Modal
// </Modal>
