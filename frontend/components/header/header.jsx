import React from 'react';

import Modal from './sampleModal';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // change showModal to a string instead of a boolean to handle different MODALS

    this.state = { showModal: "" };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(modalName) {
    this.setState({showModal: modalName});
  }

  // onClick version 1 & version 2
  // return( e => {
  //   e.preventDefault();
  //   this.setState({showModal: [field]});
  // });

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
          <button onClick={ e => this.toggleModal('modal1')}>
            Open modal1
          </button>

          <Modal show={this.state.showModal === 'modal1'}
            closeModal={ e => this.toggleModal("")} >
            This is modal1
          </Modal>

          <button onClick={ e => this.toggleModal('modal2')}>
            Open modal2
          </button>

          <Modal show={this.state.showModal === 'modal2'}
            closeModal={ e => this.toggleModal("")} >
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
