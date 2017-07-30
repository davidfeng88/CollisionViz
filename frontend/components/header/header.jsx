import React from 'react';

import Modal from './sampleModal';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
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
          <button onClick={this.toggleModal}>
            Open modal1
          </button>

          <Modal show={this.state.showModal}
            toggleModal={this.toggleModal} >
            modal1
          </Modal>

          <button onClick={this.toggleModal}>
            Open modal2
          </button>

          <Modal show={this.state.showModal}
            toggleModal={this.toggleModal} >
            modal2
          </Modal>
          <a>About CollisionViz</a>
          <br />
          <a>About Me</a>
          <br />
          <a>Credits</a>
        </div>
      </header>
    );
  }
}

export default Header;
