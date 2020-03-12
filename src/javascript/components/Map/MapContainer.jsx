import {
  connect,
} from 'react-redux';

import {
  updateFilter,
} from '../../actions';

import Map from './Map';

const mapStateToProps = ({
  date,
  hour,
}) => ({
  date,
  hour,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: filters => dispatch(updateFilter(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
