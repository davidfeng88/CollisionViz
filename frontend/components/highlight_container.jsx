import React from 'react';
import { connect } from 'react-redux';
import { selectHighlight } from '../reducers/selectors';
import {
  updateHighlight,
  resetHighlight,
} from '../actions/highlight_actions';

const mapStateToProps = state => ({
  highlight: selectHighlight(state),
});

const mapDispatchToProps = dispatch => ({
  resetHighlight: () => dispatch(resetHighlight()),
});

class Highlight extends React.Component {
  constructor(props) {
    super(props);
  }

  capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  details(collision) {
    let detailsArray = [];
    for (let key in collision) {
      if (
        key ==='id' ||
        collision[key] === null ||
        collision[key] === 0
      ) {
        continue;
      }
      detailsArray.push(`${this.capitalize(key)}: ${collision[key]}`);
      detailsArray.push(<span key={key}><br /></span>);
    }
    return detailsArray;
  }

  render() {
    let { highlight } = this.props;
    if (highlight) {
      let { id } = highlight;
      return(
        <div className='highlight'>
          <div className='highlight-first-row'>
            <div className='title'>
              Collision Details:
            </div>

            <div className='clear-highlight' onClick={this.props.resetHighlight}>
            ×
            </div>
          </div>

          <div className='highlight-info'>
            {this.details(highlight)}
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
