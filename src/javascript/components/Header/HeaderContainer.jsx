import React from 'react';
import Header from './Header';

export default class HeaderContainer extends React.Component {
  state = {
    isModalOn: false,
  };

  flipModal = () => {
    this.setState(prevState => ({
      isModalOn: !prevState.isModalOn,
    }));
  };

  render = () => {
    const { isModalOn } = this.state;
    return (
      <Header
        isModalOn={isModalOn}
        flipModal={this.flipModal}
      />
    );
  };
}
