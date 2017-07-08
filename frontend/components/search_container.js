import { connect } from 'react-redux';
import { updateFilter, resetFilter } from '../actions/filter_actions';
import { collisionsToArray } from '../reducers/selectors';
import Search from './search';

const mapStateToProps = state => ({
  collisions: collisionsToArray(state),
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filters) => dispatch(updateFilter(filters)),
  resetFilter: () => dispatch(resetFilter())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
