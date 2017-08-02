import React from 'react';
import { connect } from 'react-redux';
import { selectHighlight } from '../reducers/selectors';

import {
  updateHighlight,
  resetHighlight,
} from '../actions/highlight_actions';

const mapStateToProps = state => ({
  collision: selectHighlight(state),
});

const mapDispatchToProps = dispatch => ({
  resetHighlight: () => dispatch(resetHighlight()),
});

const DetailEntry = ({ name, value }) => {
  return(
    <section>
      <p className='detail-entry'><span className='bold'>{name}</span>
      <br />
      {value}</p>
    </section>
  );
};

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
    detailsArray.push([this.capitalize(key), collision[key]]);
    // detailsArray.push(`${this.capitalize(key)}: ${collision[key]}`);
    // detailsArray.push(<span key={key}><br /></span>);
    }
    let detailsEntries = detailsArray.map( detail => (
        <DetailEntry key={ detail[0] }
          name={ detail[0] } value={ detail[1] } />
    ));
    return (
      <div className='highlight-info'>
        {detailsEntries}
      </div>
    );
  }

  render() {
    let { collision } = this.props;
    if (collision) {
      return(
        <div className='highlight-wrapper'>
          <div className='highlight'>
            <div className='highlight-first-row'>
              <div>
                Collision Details:
              </div>

              <div className='clear-highlight' onClick={this.props.resetHighlight}>
              ×
              </div>
            </div>
            {this.details(collision)}
            Note:<br />
            Time is shown in UTC.<br />
            New York local time is UTC−04:00 with daylight saving time.
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
