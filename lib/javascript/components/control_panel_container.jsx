import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ControlPanel from './control_panel';
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

const mapStateToProps = ( {
  start,
  finish,
  initialTime,
  date,
  loading
} ) => ( {
  start,
  finish,
  initialTime,
  date,
  loading,
} );

const mapDispatchToProps = dispatch => ( {
  updateFilter: ( filters ) => dispatch( updateFilter( filters ) ),
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ControlPanel );
