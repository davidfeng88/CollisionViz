import React from 'react';
import { connect } from 'react-redux';
import { updateFilter, resetFilter } from '../actions/filter_actions';
import Toggle from './toggle';

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
  resetFilter: () => dispatch(resetFilter()),
});

const START_TIME = 0;
const END_TIME = 1439;

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.filters.finish,
      intervalId: null,

      initialTime: this.props.filters.start,
      collisionMapTime: 29,
      stepTime: 200,

      mute: true,
      showExtra: false,
    };

    this.updateInitialTime = this.updateInitialTime.bind(this);
    this.updateCollisionMapTime = this.updateCollisionMapTime.bind(this);
    this.updateStepTime = this.updateStepTime.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.toggleMute = this.toggleMute.bind(this);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.oneStepBackward = this.oneStepBackward.bind(this);
    this.oneStepForward = this.oneStepForward.bind(this);

    this.extraPanel = this.extraPanel.bind(this);
  }

  componentDidMount() {
    this.props.updateFilter();
  }

  updateCollisionMapTime(e) {
    let collisionMapTime = parseInt(e.currentTarget.value);
    this.setState({ collisionMapTime });
  }

  updateStepTime(e) {
    let stepTime = parseInt(e.currentTarget.value);
    this.setState({ stepTime });
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      let intervalId = setInterval(this.oneStepForward, stepTime);
      // do not use this.state.stepTime since the setState can be async
      this.setState({ intervalId });
    }
  }

  updateInitialTime(e) {
    let newTime = parseInt(e.currentTarget.value);
    this.setState({
      initialTime: newTime,
      currentTime: newTime,
    });
    this.props.updateFilter({
      start: newTime,
      finish: newTime,
    });
  }

  handleReset() {
    this.handleStop();
    this.props.resetFilter();
    this.props.updateFilter()
    .then(
      () => this.setState({
        initialTime: this.props.filters.start,
        currentTime: this.props.filters.finish,
      })
    );
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
      this.setState({ intervalId: null });
    }
  }

  playPauseButton() {
    let playPauseButtonText = this.state.intervalId ? "Pause" : "Play";
    let handleClick = this.state.intervalId ? this.handleStop : this.handlePlay;
    return (
      <div id='play-button'
        className="clickable-div bordered" onClick={handleClick}>
        {playPauseButtonText}
      </div>
    );
  }

  oneStepBackward() {
    this.oneStep(-1);
  }

  oneStepForward() {
    this.oneStep(1);
  }

  oneStep(delta) {
    let newTime = this.state.currentTime + delta;
    if (newTime > END_TIME) {
      this.handleStop();
    } else {
      this.updateTime(newTime);
    }
  }

  updateTime(newTime) {
    this.setState({ currentTime: newTime });
    let start = newTime - this.state.collisionMapTime;
    let finish = newTime;
    start = start < this.state.initialTime ? this.state.initialTime : start;
    start = start < START_TIME ? START_TIME : start;
    finish = finish > END_TIME ? END_TIME : finish;
    this.props.updateFilter({
      start,
      finish,
    });
  }

  toggleMute() {
    let newValue = !this.state.mute;
    this.setState({ mute: newValue });
    let traffic = document.getElementById("traffic");
    if (this.state.intervalId && !newValue) {
      traffic.play();
      traffic.loop = true;
      traffic.volume = 0.2;
    } else {
      traffic.pause();
    }
  }

  extraPanel() {
    if (this.state.showExtra) {
      return(
        <div className='extra-panel bordered'>
          <div className="flex-row panel-row">
            <label htmlFor='collision-map-time'>
              Collisions Map Time
            </label>
            <select
              id='collision-map-time'
              value={this.state.collisionMapTime}
              onChange={this.updateCollisionMapTime} >
              <option value='4' >5 minutes</option>
              <option value='9' >10 minutes</option>
              <option value='29' >30 minutes</option>
              <option value='59' >60 minutes</option>
            </select>
          </div>
          <div className="flex-row panel-row">
            <label htmlFor='step-time'>
              Time Lapse Rate
            </label>
            <select
              id="step-time"
              value={this.state.stepTime}
              onChange={this.updateStepTime} >
              <option value='100' >Fast</option>
              <option value='200' >Default</option>
              <option value='400' >Slow</option>
            </select>
          </div>
          <Toggle
            label="Sound"
            checked={!this.state.mute}
            onChange={this.toggleMute} />
        </div>
      );
    } else {
      return null;
    }
  }

  toggle(field) {
    return e => {
      let newValue = !this.state[field];
      this.setState({ [field]: !this.state[field] });
    };
  }

  render() {
    return(
      <div className="panel flex-row">
        <div>
          <label htmlFor='initial-time'>
            Start Time
          </label>
          <select
            id='initial-time'
            value={this.state.initialTime}
            onChange={this.updateInitialTime} >
            <option value='420' >07:00</option>
            <option value='0' >00:00</option>
            <option value='720' >12:00</option>
            <option value='1080' >18:00</option>
            <option value='1320' >22:00</option>
          </select>
        </div>
        {this.playPauseButton()}
        <div className='clickable-div bordered' onClick={this.handleReset}>
          Reset Time
        </div>
        <Toggle
          label="More Settings"
          checked={this.state.showExtra}
          onChange={this.toggle('showExtra')} />
        {this.extraPanel()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
