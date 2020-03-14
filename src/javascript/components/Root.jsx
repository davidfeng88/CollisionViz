import React from 'react';

import App from './App';

export default class Root extends React.Component {
  state = {
    date: '2017-03-13',
    hour: 8,
    loading: true,
  };

  updateAppState = (newState) => {
    this.setState(newState);
  };

  render = () => {
    const { date, hour, loading } = this.state;
    return (
      <App
        date={date}
        hour={hour}
        loading={loading}
        updateAppState={this.updateAppState}
      />
    );
  };
}
