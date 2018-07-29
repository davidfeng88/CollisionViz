import {
  connect,
} from 'react-redux';
import ControlPanel from './control_panel';
import {
  updateFilter,
} from '../actions';

const mapStateToProps = ({
  start,
  finish,
  initialTime,
  date,
  loading,
}) => ({
  start,
  finish,
  initialTime,
  date,
  loading,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: filters => dispatch(updateFilter(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
