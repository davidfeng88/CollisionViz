import React from 'react';

const START_TIME = 0;
const END_TIME = 1439;

const parseTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60).toString();
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  let minutes = (totalMinutes % 60).toString();
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

const timeLine = (currentTime, collisionMapTime, initialTime) => {
  let finish = parseInt(currentTime);
  let start = finish - parseInt(collisionMapTime);

  if (start > END_TIME || finish > END_TIME) {
    start = END_TIME - parseInt(collisionMapTime);
    finish = END_TIME;
  }

  if (start < initialTime) {
    start = initialTime;
  }

  if (start < START_TIME || finish < START_TIME) {
    start = START_TIME;
    finish = START_TIME + parseInt(collisionMapTime);
  }

  return(
    `${parseTime(start)} - ${parseTime(finish)}`
  );
};

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.filters.finish,
      initialTime: this.props.filters.start,

      intervalId: null,
      collisionMapTime: 29,
      stepTime: 200,
    };

    this.updateField = this.updateField.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.oneStepForward = this.oneStepForward.bind(this);
    this.oneStepBackward = this.oneStepBackward.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // update state from props
    this.setState({
      currentTime: this.props.filters.finish,
    });
  }

  updateField(field) {
    if (field === 'currentTime') {
      return e => this.setState({
        initialTime: parseInt(e.currentTarget.value),
        [field]: parseInt(e.currentTarget.value)
      });
    } else {
      return e => this.setState({
        [field]: parseInt(e.currentTarget.value)
      });
    }
  }

  updateForm(newTime) {
    let start = newTime - this.state.collisionMapTime;
    let finish = newTime;

    if (start < this.state.initialTime) {
      start = this.state.initialTime;
    }

    if (start < START_TIME) {
      start = START_TIME;
    }

    if (finish > END_TIME) {
      finish = END_TIME;
    }

    this.props.updateFilter({
      start,
      finish,
    });
  }

  handleReset() {
    this.handleStop();
    this.props.resetFilter();
    this.props.updateFilter()
    .then(
      () => this.setState({
        initialTime: this.props.filters.start,
      })
    );
  }

  handlePlay(e) {
    if (!this.state.intervalId) {
      let intervalId = setInterval(this.oneStepForward, this.state.stepTime);
      this.setState({ intervalId });
    }
  }

  handleStop() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  }

  oneStepBackward() {
    this.updateTime(-1);
  }

  oneStepForward() {
    this.updateTime(1);
  }

  updateTime(delta) {
    let newTime = this.state.currentTime + delta;
    // if (newTime > END_TIME + this.state.collisionMapTime) {
    //   this.handleStop();
    // }
    this.updateForm(newTime);
  }

  render() {
    const {
      updateFilter,
      resetFilter,
      collisions,
    } = this.props;

    return(
      <div className="filter">
        Current Map Time: {parseTime(this.state.currentTime)}
        <br />
        {collisions.length} collision(s) during&nbsp;
        {timeLine(
          this.state.currentTime,
          this.state.collisionMapTime,
          this.state.initialTime
        )}
        <br />
        <form>

          <label htmlFor='time-start'>Set start time</label>
          <select id="time-start" value={this.state.currentTime}
            onChange={this.updateField('currentTime')} >
            <option value='420' >7:00 Morning</option>
            <option value='0' >0:00 Midnight</option>
            <option value='720' >12:00 Noon</option>
            <option value='1080' >18:00 Afternoon</option>
            <option value='1320' >22:00 Night</option>
          </select>
          <br />
          <label htmlFor='collision-map-time'>
            Collisions stay on map for: </label>
          <select id="collision-map-time" value={this.state.collisionMapTime}
            onChange={this.updateField('collisionMapTime')} >
            <option value='4' >5 minutes</option>
            <option value='9' >10 minutes</option>
            <option value='29' >30 minutes</option>
            <option value='59' >60 minutes</option>
          </select>
          <br />
          <label htmlFor='step-time'>
            Time lapse rate: </label>
          <select id="step-time" value={this.state.stepTime}
            onChange={this.updateField('stepTime')} >
            <option value='100' >Fast</option>
            <option value='200' >Default</option>
            <option value='400' >Slow</option>
          </select>

          <div className='buttons'>
            <div className='clickable-div' onClick={this.handlePlay}>
              <i className="fa fa-play fa-2x" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.handleStop}>
              <i className="fa fa-pause fa-2x" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.handleReset}>
              <i className="fa fa-repeat fa-2x" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.oneStepBackward}>
            <i className="fa fa-step-backward fa-2x" aria-hidden="true"></i>
            </div>
            <div className='clickable-div' onClick={this.oneStepForward}>
              <i className="fa fa-step-forward fa-2x" aria-hidden="true"></i>
            </div>
          </div>
        </form>
      </div>
    );


  }

}


export default FilterForm;
