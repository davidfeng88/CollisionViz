import React from 'react';
import Header from './Header';

export default class HeaderContainer extends React.Component {
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
      <Header
        currentModal={currentModal}
        switchModal={this.switchModal}
      />
    );
  };
}
