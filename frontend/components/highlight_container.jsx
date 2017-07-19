import React from 'react';
import { connect } from 'react-redux';
import { selectHighlight } from '../reducers/selectors';
import { updateHighlight } from '../actions/highlight_actions';

const mapStateToProps = state => ({
  highlight: selectHighlight(state),
});

const mapDispatchToProps = dispatch => ({
  Highlight: () => dispatch(updateHighlight(-1)),
});

class Highlight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { highlight } = this.props;
    if (highlight) {
      let { id } = highlight;
      return(
        <div className='highlight'>
          <div className='highlight-info'>
            Collision Details: {id}
          </div>

          <div className='clear-highlight' onClick={this.props.clearHighlight}>
          ×
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Highlight);
