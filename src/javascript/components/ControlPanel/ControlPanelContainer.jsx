import {
  connect,
} from 'react-redux';
import ControlPanel from './ControlPanel';
import {
  updateFilter,
  toggleExtra,
} from '../../actions';

const mapStateToProps = ({
  start,
  finish,
  initialTime,
  date,
  loading,
  extraShown,
}) => ({
  start,
  finish,
  initialTime,
  date,
  loading,
  extraShown,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: filters => dispatch(updateFilter(filters)),
  toggleExtra: () => dispatch(toggleExtra()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
