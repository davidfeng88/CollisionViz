import {
  connect,
} from 'react-redux';

import {
  updateFilter,
} from '../../actions';

import Map from './Map';

const mapStateToProps = ({
  start,
  finish,
  date,

}) => ({
  start,
  finish,
  date,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: filters => dispatch(updateFilter(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
