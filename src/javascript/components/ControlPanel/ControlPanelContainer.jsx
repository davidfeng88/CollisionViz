import {
  connect,
} from 'react-redux';
import ControlPanel from './ControlPanel';
import {
  updateFilter,
} from '../../actions';

const mapStateToProps = ({
  date,
}) => ({
  date,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: filters => dispatch(updateFilter(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
