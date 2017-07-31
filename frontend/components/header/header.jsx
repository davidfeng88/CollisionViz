import React from 'react';

import Modal from './sampleModal';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shownModal: "" };
    this.showModal = this.showModal.bind(this);
  }

  showModal(modalName) {
    return ( e => {
      e.preventDefault();
      this.setState({shownModal: modalName});
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

          <button onClick={this.showModal("modal1")}>
            Open modal1
          </button>

          <Modal show={this.state.shownModal === 'modal1'}
            closeModal={this.showModal("")} >
            This is modal1
          </Modal>

          <button onClick={this.showModal("modal2")}>
            Open modal2
          </button>

          <Modal show={this.state.shownModal === 'modal2'}
            closeModal={this.showModal("")} >
            This is modal2
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
