import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { updateFilter } from '../actions';
import { timeIntToString, timeStringToInt } from '../util/time_util';
import { DEFAULT_TIME } from '../reducer';
import Toggle from './toggle';

const mapStateToProps = ({start, finish, date, loaded}) => ({
    start, finish, date, loaded,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
});

const START_TIME = 0;
const END_TIME = 1439;

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // changes need to trigger re-render
      intervalId: null, // grey out the inputs

      collisionMapTime: 29,
      stepTime: 200,
      //toggle
      mute: true,
      showExtra: false,
    };

    // changes does not need to re-render
    this.currentTime = this.props.finish;
    this.initialTime = this.props.start;

    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.oneStepForward = this.oneStepForward.bind(this);
  }

  updateField(field) {
    return( (e) => {
      e.preventDefault();
      switch (field) {
        case 'collisionMapTime':
        case 'stepTime':
          this.setState({ [field]: parseInt(e.currentTarget.value) });
          break;

        case 'date':
          this.handleReset();
          this.props.updateFilter({ date: e.currentTarget.value });
          break;

        case 'time':
          if (e.currentTarget.value !== "") {
            let value = timeStringToInt(e.currentTarget.value);
            this.initialTime = value;
            this.currentTime = value;

            this.props.updateFilter({
              start: value,
              finish: value,
            });
          }
          break;

        default:

      }
    });
  }

  handleReset() {
    this.handleStop();
    this.props.updateFilter({
      start: DEFAULT_TIME,
      finish: DEFAULT_TIME
    });
    this.initialTime = DEFAULT_TIME;
    this.currentTime = DEFAULT_TIME;
  }

  handlePlay() {
    if (!this.state.intervalId) {
      let intervalId = setInterval(this.oneStepForward, this.state.stepTime);
      this.setState({ intervalId });
    }
    if (!this.state.mute) {
      let traffic = document.getElementById("traffic");
      traffic.play();
      traffic.loop = true;
      traffic.volume = 0.2;
    }
  }

  handleStop() {
    if (this.state.intervalId) {
      let traffic = document.getElementById("traffic");
      traffic.pause();
      clearInterval(this.state.intervalId);
      this.setState({ intervalId:null });
    }
  }

// this.state.loaded

  playPauseButton() {
    if (true) {
      let playPauseButtonText = this.state.intervalId ? "Pause" : "Play";
      let handleClick = this.state.intervalId ? this.handleStop : this.handlePlay;
      return (
        <div className='play-button clickable-div bordered'
          onClick={handleClick}>
          {playPauseButtonText}
        </div>
      );
    } else {
      return(
        <div className="spinner bordered">
          <img src='./assets/images/spinner.svg' />
        </div>
      );
    }
  }

  oneStepForward() {
    let newTime = this.currentTime + 1;
    if (newTime > END_TIME) {
      this.handleStop();
    } else {
      this.currentTime = newTime;
      let start = newTime - this.state.collisionMapTime;
      let finish = newTime;
      start = start < this.initialTime ? this.initialTime : start;
      start = start < START_TIME ? START_TIME : start;
      finish = finish > END_TIME ? END_TIME : finish;
      this.props.updateFilter({
        start,
        finish,
      });
    }
  }

  toggle(field) {
    return (e => {
      let newValue = !this.state[field];
      this.setState({[field]: newValue});
      if (field === 'mute') {
        let traffic = document.getElementById("traffic");
        if (this.state.intervalId && !newValue) {
          traffic.play();
          traffic.loop = true;
          traffic.volume = 0.2;
        } else {
          traffic.pause();
        }
      }
    });
  }

  extraPanel() {
    let extraPanel = null;
    if (this.state.showExtra) {
      extraPanel = (
        <div className='flex-row'>
          <div>
            <label htmlFor='collision-map-time'>
              Collisions Map Time
            </label>
            <select
              id='collision-map-time'
              value={this.state.collisionMapTime}
              onChange={this.updateField('collisionMapTime')}
              disabled={this.state.intervalId ? "disabled" : ""}
            >
              <option value='4' >5 minutes</option>
              <option value='9' >10 minutes</option>
              <option value='29' >30 minutes</option>
              <option value='59' >60 minutes</option>
            </select>
          </div>
          <div>
            <label htmlFor='step-time'>
              Time Lapse Rate
            </label>
            <select
              id="step-time"
              value={this.state.stepTime}
              onChange={this.updateField('stepTime')}
              disabled={this.state.intervalId ? "disabled" : ""}
            >
              <option value='100' >Fast</option>
              <option value='200' >Default</option>
              <option value='400' >Slow</option>
            </select>
          </div>
          <Toggle
            label="Sound"
            checked={!this.state.mute}
            onChange={this.toggle('mute')}
          />
        </div>
      );
    }
    return(
      <ReactCSSTransitionGroup
        transitionName="extra"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
        >
      {extraPanel}
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    return(
      <div>
        <div className="flex-row">
          <div>
            <label htmlFor='date'>
              Select Date (2012-07-01 ~ 2017-08-01)
            </label>
            <input
              value={this.props.date} id='date'
              type="date" min="2012-07-01" max="2017-08-01"
              onChange={this.updateField('date')}
              disabled={this.state.intervalId ? "disabled" : ""}
            />
          </div>
          <div>
            <label htmlFor='time'>
              Select Start Time
            </label>
            <input
              id='time'
              type="time"
              value={timeIntToString(this.initialTime, true)}
              onChange={this.updateField('time')}
              disabled={this.state.intervalId ? "disabled" : ""}
            />
          </div>
          <Toggle
            label="More Settings"
            checked={this.state.showExtra}
            onChange={this.toggle('showExtra')}
          />
        </div>
        {this.extraPanel()}
        <div className="flex-row play-row">
          {this.playPauseButton()}
          <div className='clickable-div bordered' onClick={this.handleReset}>
            Reset Time
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
