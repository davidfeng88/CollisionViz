import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import StartPauseButton from './StartPauseButton';
import {
  DEFAULT_TIME,
  START_TIME,
  END_TIME,
  timeStringToInt,
} from '../../util';
import Toggle from '../toggle';

class ControlPanel extends React.Component {
  state = {
    // changes need to trigger re-render
    // grey out the inputs
    intervalId: null,
    // change of select
    collisionMapTime: 15,
    delay: 200,
    // toggle
    mute: true,
  };

  updateField = field => ((e) => {
    e.preventDefault();
    switch (field) {
      case 'collisionMapTime':
      case 'delay':
        this.setState({
          [field]: parseInt(e.currentTarget.value),
        });
        break;

      case 'date':
        this.handleReset();
        this.props.updateFilter({
          date: e.currentTarget.value,
          loading: true,
        });
        break;

      case 'time':
        if (e.currentTarget.value !== '') {
          const newTime = timeStringToInt(e.currentTarget.value);
          this.setNewTime(newTime);
        }
        break;

      default:
    }
  });

  handleReset = () => {
    this.handlePause();
    this.setNewTime(DEFAULT_TIME);
  };

  setNewTime = (time) => {
    const { updateFilter } = this.props;
    updateFilter({
      start: time,
      finish: time,
      initialTime: time,
    });
  };

  handleStart = () => {
    const { intervalId, delay, mute } = this.state;
    if (!intervalId) {
      const newIntervalId = setInterval(this.step, delay);
      this.setState({
        intervalId: newIntervalId,
      });
    }
    if (!mute) {
      const traffic = document.getElementById('traffic');
      traffic.play();
      traffic.loop = true;
      traffic.volume = 0.2;
    }
  };

  handlePause = () => {
    const { intervalId } = this.state;
    if (intervalId) {
      const traffic = document.getElementById('traffic');
      traffic.pause();
      clearInterval(intervalId);
      this.setState({
        intervalId: null,
      });
    }
  };

  step = () => {
    const newTime = this.props.finish + 1;
    if (newTime > END_TIME) {
      this.handlePause();
    } else {
      let start = newTime - this.state.collisionMapTime + 1;
      const finish = newTime;
      start = start > this.props.initialTime ? start : this.props.initialTime;
      start = start > START_TIME ? start : START_TIME;
      this.props.updateFilter({
        start,
        finish,
      });
    }
  };

  toggle = field => ((e) => {
    const newValue = !this.state[field];
    this.setState({
      [field]: newValue,
    });
    if (field === 'mute') {
      const traffic = document.getElementById('traffic');
      if (this.state.intervalId && !newValue) {
        traffic.play();
        traffic.loop = true;
        traffic.volume = 0.2;
      } else {
        traffic.pause();
      }
    }
  });

  extraPanel = () => {
    let extraPanel = null;
    if (this.props.extraShown) {
      extraPanel = (
        <div className="flex-row">
          <div>
            <label htmlFor="collision-map-time">
              Collisions Stay on Map for
              <br />
              {this.state.collisionMapTime}
              {' '}
Minute(s)
            </label>
            <input
              id="collision-map-time"
              value={this.state.collisionMapTime}
              type="range"
              min="1"
              max="60"
              onChange={this.updateField('collisionMapTime')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <div>
            <label htmlFor="delay">
              1 Minute Map Time =
              {' '}
              <br />
              {this.state.delay}
              {' '}
Milliseconds Wall Time
            </label>
            <input
              id="delay"
              value={this.state.delay}
              type="range"
              min="50"
              max="1000"
              onChange={this.updateField('delay')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <Toggle
            label="Sound"
            checked={!this.state.mute}
            onChange={this.toggle('mute')}
          />
        </div>
      );
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="extra"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
      >
        {extraPanel}
      </ReactCSSTransitionGroup>
    );
  };

  render = () => {
    const { intervalId } = this.state;
    const { loading, date, finish } = this.props;
    return (
      <div>
        <div className="flex-row">
          <DateSelector
            date={date}
            onChange={this.updateField('date')}
            intervalId={intervalId}
          />
          <TimeSelector
            finish={finish}
            onChange={this.updateField('time')}
            intervalId={intervalId}
          />
          <StartPauseButton
            loading={loading}
            intervalId={intervalId}
            handleStart={this.handleStart}
            handlePause={this.handlePause}
          />
        </div>
        <div className="flex-row start-row">
          <b>
4. Click on markers for details
          </b>

          <div
            className="clickable-div bordered"
            onClick={this.handleReset}
          >
            Reset Time
          </div>
          <Toggle
            label="More Settings"
            checked={this.props.extraShown}
            onChange={this.props.toggleExtra}
          />
        </div>
        {this.extraPanel()}
      </div>
    );
  };
}

export default ControlPanel;
