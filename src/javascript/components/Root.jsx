import React from 'react';

import App from './App';

class Root extends React.Component {
  state = {
    collisions: [],
    date: '2017-03-13',
    hour: 8,
    loading: true,
  };

  updateAppState = (newState) => {
    this.setState(newState);
  };

  render = () => {
    const {
      collisions, date, hour, loading,
    } = this.state;
    return (
      <App
        collisions={collisions}
        date={date}
        hour={hour}
        loading={loading}
        updateAppState={this.updateAppState}
      />
    );
  };
}

export default Root;
