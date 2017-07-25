import React from 'react';
import { connect } from 'react-redux';
import { updateFilter, resetFilter } from '../actions/filter_actions';

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
  resetFilter: () => dispatch(resetFilter()),
});

const START_TIME = 0;
const END_TIME = 1439;

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.filters.finish,
      intervalId: null,

      initialTime: this.props.filters.start,
      collisionMapTime: 29,
      stepTime: 200,

      taxi: this.props.filters.taxi,
      bike: this.props.filters.bike,
      motorcycle: this.props.filters.motorcycle,
      ped: this.props.filters.ped,
      mute: true,
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
  }

  componentDidMount() {
    this.props.updateFilter();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      currentTime: newProps.filters.finish,
    });
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

  toggleCheckbox(field) {
    return e => {
      let newValue = !this.state[field];
      this.props.updateFilter({[field]: newValue});
      this.setState({ [field]: newValue });
    };
  }
  // fat arrow functions automatic bind this

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

  speakerIcon() {
    if (this.state.mute) {
      return(
        <div className="fa-stack">
          <i className="fa fa-lg fa-volume-off fa-stack-2x"
            aria-hidden="true"></i>
          <i className="fa fa-lg fa-ban fa-stack-2x red"
            aria-hidden="true"></i>
        </div>
      );
    } else {
      return(
        <div>
          <i className="fa fa-lg fa-volume-up" aria-hidden="true"></i>
        </div>
      );
    }
  }

  render() {
    return(
      <div className="filter">
        <form>
          <label htmlFor='time-start'>Set start time</label>
          <select id="time-start" value={this.state.initialTime}
            onChange={this.updateInitialTime} >
            <option value='420' >7:00 Morning</option>
            <option value='0' >0:00 Midnight</option>
            <option value='720' >12:00 Noon</option>
            <option value='1080' >18:00 Afternoon</option>
            <option value='1320' >22:00 Night</option>
          </select>
          <br />
          <label htmlFor='collision-map-time'>
            Collisions stay on the map for: </label>
          <select id="collision-map-time" value={this.state.collisionMapTime}
            onChange={this.updateCollisionMapTime} >
            <option value='4' >5 minutes</option>
            <option value='9' >10 minutes</option>
            <option value='29' >30 minutes</option>
            <option value='59' >60 minutes</option>
          </select>
          <br />
          <label htmlFor='step-time'>
            Time lapse rate: </label>
          <select id="step-time" value={this.state.stepTime}
            onChange={this.updateStepTime} >
            <option value='100' >Fast</option>
            <option value='200' >Default</option>
            <option value='400' >Slow</option>
          </select>

          <div className='buttons'>
            <div className='clickable-div' onClick={this.handlePlay}>
              <i className="fa fa-play fa-lg" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.handleStop}>
              <i className="fa fa-pause fa-lg" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.handleReset}>
              <i className="fa fa-repeat fa-lg" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.oneStepBackward}>
            <i className="fa fa-step-backward fa-lg" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.oneStepForward}>
              <i className="fa fa-step-forward fa-lg" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.toggleMute}>
              {this.speakerIcon()}
            </div>
          </div>

          <div className='icons'>
            <div className='icon-line'>
            Show special icons for:
            </div>
            <div className='icon-line'>
              <label htmlFor='taxi'>
              <input
                type="checkbox"
                id='taxi'
                checked={this.state.taxi}
                onChange={this.toggleCheckbox('taxi')}
              />&nbsp;
              <img src={window.staticImages.taxi} />
              &nbsp;Taxi</label>
              <label htmlFor='bike'>
              <input
                type="checkbox"
                id='bike'
                checked={this.state.bike}
                onChange={this.toggleCheckbox('bike')}
              />&nbsp;
              <img src={window.staticImages.bike} />
              &nbsp;Bicycle</label>
            </div>
            <div className='icon-line'>
              <label htmlFor='motorcycle'>
              <input
                type="checkbox"
                id='motorcycle'
                checked={this.state.motorcycle}
                onChange={this.toggleCheckbox('motorcycle')}
              />&nbsp;
              <img src={window.staticImages.motorcycle} />
              &nbsp;Motorcycle</label>
              <label htmlFor='ped'>
              <input
                type="checkbox"
                id='ped'
                checked={this.state.ped}
                onChange={this.toggleCheckbox('ped')}
              />&nbsp;
              <img src={window.staticImages.ped} />
              &nbsp;Pedestrian</label>
            </div>
          </div>
        </form>
          <div className='github-repo'>
          <a href='https://github.com/davidfeng88/CollisionViz' target="_blank">
          GitHub Repo
          </a>
          </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterForm);
