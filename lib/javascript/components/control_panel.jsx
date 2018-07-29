import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  connect
} from 'react-redux';

import {
  updateFilter
} from '../actions';
import {
  timeStringToInt,
  timeIntToString
} from '../util';
import {
  DEFAULT_TIME,
  START_TIME,
  END_TIME
} from '../reducer';
import Toggle from './toggle';

class ControlPanel extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      // changes need to trigger re-render
      // grey out the inputs
      intervalId: null,
      // change of select
      collisionMapTime: 15,
      delay: 200,
      //toggle
      mute: true,
      showExtra: false,
    };

    this.handleStart = this.handleStart.bind( this );
    this.handlePause = this.handlePause.bind( this );
    this.handleReset = this.handleReset.bind( this );
    this.step = this.step.bind( this );
  }

  updateField( field ) {
    return ( e => {
      e.preventDefault();
      switch ( field ) {
        case 'collisionMapTime':
        case 'delay':
          this.setState( {
            [ field ]: parseInt( e.currentTarget.value )
          } );
          break;

        case 'date':
          this.handleReset();
          this.props.updateFilter( {
            date: e.currentTarget.value,
            loading: true
          } );
          break;

        case 'time':
          if ( e.currentTarget.value !== '' ) {
            let newTime = timeStringToInt( e.currentTarget.value );
            this.setNewTime( newTime );
          }
          break;

        default:

      }
    } );
  }

  handleReset() {
    this.handlePause();
    this.setNewTime( DEFAULT_TIME );
  }

  setNewTime( time ) {
    this.props.updateFilter( {
      start: time,
      finish: time,
      initialTime: time,
    } );
  }

  handleStart() {
    if ( !this.state.intervalId ) {
      let intervalId = setInterval( this.step, this.state.delay );
      this.setState( {
        intervalId
      } );
    }
    if ( !this.state.mute ) {
      let traffic = document.getElementById( 'traffic' );
      traffic.play();
      traffic.loop = true;
      traffic.volume = 0.2;
    }
  }

  handlePause() {
    if ( this.state.intervalId ) {
      let traffic = document.getElementById( 'traffic' );
      traffic.pause();
      clearInterval( this.state.intervalId );
      this.setState( {
        intervalId: null
      } );
    }
  }

  startPauseButton() {
    if ( this.props.loading ) {
      return (
        <div className='spinner bordered'>
          <img src='./assets/images/spinner.svg' />
        </div>
      );
    } else {
      let startPauseButtonText = this.state.intervalId ? 'Pause' : 'Start';
      let handleClick =
        this.state.intervalId ? this.handlePause : this.handleStart;
      return (
        <div className='start-button clickable-div bordered'
          onClick={handleClick}>
          {startPauseButtonText}
        </div>
      );
    }
  }

  step() {
    let newTime = this.props.finish + 1;
    if ( newTime > END_TIME ) {
      this.handlePause();
    } else {
      let start = newTime - this.state.collisionMapTime + 1;
      let finish = newTime;
      start = start > this.props.initialTime ? start : this.props.initialTime;
      start = start > START_TIME ? start : START_TIME;
      this.props.updateFilter( {
        start,
        finish,
      } );
    }
  }

  toggle( field ) {
    return ( e => {
      let newValue = !this.state[ field ];
      this.setState( {
        [ field ]: newValue
      } );
      if ( field === 'mute' ) {
        let traffic = document.getElementById( 'traffic' );
        if ( this.state.intervalId && !newValue ) {
          traffic.play();
          traffic.loop = true;
          traffic.volume = 0.2;
        } else {
          traffic.pause();
        }
      }
    } );
  }

  extraPanel() {
    let extraPanel = null;
    if ( this.state.showExtra ) {
      extraPanel = (
        <div className='flex-row'>
          <div>
            <label htmlFor='collision-map-time'>
              Collisions Stay on Map for<br/>
              {this.state.collisionMapTime} Minute(s)
            </label>
            <input
              id='collision-map-time'
              value={this.state.collisionMapTime}
              type='range' min='1' max='60'
              onChange={this.updateField('collisionMapTime')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <div>
            <label htmlFor='delay'>
              1 Minute Map Time = <br/>
              {this.state.delay} Milliseconds Wall Time
            </label>
            <input
              id='delay'
              value={this.state.delay}
              type='range' min='50' max='1000'
              onChange={this.updateField('delay')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <Toggle
            label='Sound'
            checked={!this.state.mute}
            onChange={this.toggle('mute')}
          />
        </div>
      );
    }
    return (
      <ReactCSSTransitionGroup
        transitionName='extra'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
        >
        {extraPanel}
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate( oneWeekAgo.getDate() - 7 );
    let oneWeekAgoString = oneWeekAgo.toJSON()
      .slice( 0, 10 );
    return (
      <div>
        <div className='flex-row'>
          <div>
            <label htmlFor='date'>
              <b>1. Select Date</b><br/>
              2012-07-01 ~ {oneWeekAgoString}
            </label>
            <input
              value={this.props.date} id='date'
              type='date' min='2012-07-01' max={oneWeekAgoString}
              onChange={this.updateField('date')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <div>
            <label htmlFor='time'>
              <b>2. Select Start Time</b>
            </label>
            <input
              id='time'
              type='time'
              value={timeIntToString(this.props.finish)}
              onChange={this.updateField('time')}
              disabled={this.state.intervalId ? 'disabled' : ''}
            />
          </div>
          <div><b>3. Click Here!</b>{this.startPauseButton()}</div>
        </div>
        <div className='flex-row start-row'>


          <div className='clickable-div bordered'
            onClick={this.handleReset}>
            Reset Time
          </div>
          <Toggle
            label='More Settings'
            checked={this.state.showExtra}
            onChange={this.toggle('showExtra')}
          />
        </div>
        {this.extraPanel()}

      </div>
    );
  }
}

export default ControlPanel;
