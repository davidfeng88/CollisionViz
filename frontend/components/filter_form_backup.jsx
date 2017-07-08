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

const timeLine = (timeStart, timeInteval) => {
  let start = parseInt(timeStart);
  let finish = start + parseInt(timeInteval);

  if (start > END_TIME || finish > END_TIME) {
    start = END_TIME - parseInt(timeInteval);
    finish = END_TIME;
  }

  if (start < START_TIME || finish < START_TIME) {
    start = START_TIME;
    finish = START_TIME + parseInt(timeInteval);
  }

  return(
    `${parseTime(start)} - ${parseTime(finish)}`
  );
};

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: parseInt(props.timeStart),
      timeInteval: parseInt(props.timeInteval),
      intervalId: 0,
    };

    this.update = this.update.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.oneStepForward = this.oneStepForward.bind(this);
    this.oneStepBackward = this.oneStepBackward.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      timeStart: parseInt(newProps.timeStart),
      timeInteval: parseInt(newProps.timeInteval),
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleReset() {
    this.props.resetFilter();
    this.props.updateFilter();
  }

  handleSubmit(e) {
    e.preventDefault();
    const filter = this.state;
    this.props.updateFilter(filter);
  }

  handlePlay(e) {
    this.handleSubmit(e);
    let intervalId = setInterval(this.oneStepForward, 500);
    this.setState({ intervalId });
  }

  handleStop(){
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: 0,
    });
  }

  oneStepBackward() {
    let start = parseInt(this.state.timeStart);
    let newStart = start - parseInt(this.state.timeInteval) - 1;

    if (start < START_TIME || newStart < START_TIME) {
      newStart = START_TIME;
    }

    this.props.updateFilter( {
      'timeStart': newStart,
    });
  }

  oneStepForward() {
    let start = this.state.timeStart;
    let newStart = start + this.state.timeInteval + 1;

    if (start > END_TIME || newStart > END_TIME) {
      newStart = END_TIME - this.state.timeInteval;
      if (this.state.intervalId) {
        this.handleStop();
      }
    }

    this.props.updateFilter( {
        'timeStart': newStart,
      });

  }

  render() {
    const {
      updateFilter,
      resetFilter,
      collisions,
    } = this.props;

    return(
      <div className="filter">
        <div>
          {timeLine(this.state.timeStart, this.state.timeInteval)}
        </div>
        <div>
          Number of collisions: {collisions.length}
        </div>
        <div className='clickable-div' onClick={this.oneStepForward}>
          click me to move one step forward
        </div>
        <div className='clickable-div' onClick={this.oneStepBackward}>
          click me to move one step backward
        </div>
        <div className='clickable-div' onClick={this.handlePlay}>
          click me to play
        </div>
        <div className='clickable-div' onClick={this.handleStop}>
          click me to stop
        </div>
        <form onSubmit={this.handleSubmit} className='price-filter'>
          <div className='price-filter-col'>
            <label htmlFor='time-start'>Start Time</label>
            <select id="time-start" value={this.state.timeStart}
              onChange={this.update('timeStart')} >
              <option value='0' >0:00 Midnight</option>
              <option value='480' >8:00 Morning</option>
              <option value='720' >12:00 Noon</option>
              <option value='1080' >18:00 Afternoon</option>
              <option value='1320' >22:00 Night</option>
            </select>
          </div>
          <div className='price-filter-col'>
            <label htmlFor='time-interval'>Time Interval</label>
            <select id="time-interval" value={this.state.timeInteval}
              onChange={this.update('timeInteval')} >
              <option value='4' >5 minutes</option>
              <option value='9' >10 minutes</option>
              <option value='14' >15 minutes</option>
              <option value='29' >30 minutes</option>
              <option value='59' >60 minutes</option>

            </select>
          </div>

        </form>

        <div className='clickable-div' onClick={this.handleReset}>
          Reset Filter
        </div>

        <div>
          <button type="submit" >Update Filter</button>
        </div>

      </div>
    );


  }

}


export default FilterForm;
