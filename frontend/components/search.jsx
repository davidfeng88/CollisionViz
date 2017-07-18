import React from 'react';

import FilterForm from './filter_form';
import Map from './map';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateFilter();
  }

  componentWillUnmount() {
    this.props.resetFilter();
  }

  render() {
    let { collisions, filters,
      updateFilter, resetFilter } = this.props;
    return(
      <div className='container'>
        <aside>
          <div className='logo'>
            <img src={window.staticImages.logo} />
            <h1>CollisionViz</h1>
          </div>
          <h3>A visualization of motor vehicle collisions
          in NYC on 6/22/2017 (Fri.)</h3>
          <h2>by <a href='https://davidfeng.us/' target="_blank">Ge "David" Feng</a></h2>
          <div className='links'>
            <a href='https://github.com/davidfeng88' target="_blank">
              <i className="fa fa-github fa-2x" aria-hidden="true"></i>
            </a>
            <a href='https://www.linkedin.com/in/gfeng/' target="_blank">
              <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
            </a>
            <a href='https://angel.co/ge-david-feng' target="_blank">
              <i className="fa fa-angellist fa-2x" aria-hidden="true"></i>
            </a>
            <a href='https://davidfeng.us/' target="_blank">
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </a>
          </div>

          <FilterForm
            filters={filters}
            updateFilter={updateFilter}
            resetFilter={resetFilter}
            collisions={collisions}
          />

        </aside>

        <Map collisions={collisions} />

      </div>
    );
  }
}

export default Search;
