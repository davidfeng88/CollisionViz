import React from 'react';

import App from './App';

export default class AppContainer extends React.Component {
  state = {
    date: '2020-01-01',
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
