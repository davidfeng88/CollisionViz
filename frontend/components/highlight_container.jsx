import React from 'react';
import { connect } from 'react-redux';
import { selectHighlight } from '../reducers/selectors';
import { updateHighlight } from '../actions/highlight_actions';

const mapStateToProps = state => ({
  highlight: selectHighlight(state),
});

const mapDispatchToProps = dispatch => ({
  updateHighlight: (collisionId) => dispatch(updateHighlight(collisionId)),
});

class Highlight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { highlight } = this.props;
    if (highlight) {
      return(
        <div className='highlight'>
          <div className='highlight-info'>
            Collision Details:
          </div>

          <div className='clear-highlight' onClick={this.props.updateHighlight}>
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
