import React from 'react';

import FilterFormContainer from './filter_form_container';
import MapContainer from './map_container';
import HighlightContainer from './highlight_container';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='container'>
        <div className='main'>
          <aside>
            <div className='logo'>
              <img src={window.staticImages.logo} />
              <h1>CollisionViz</h1>
            </div>
            <h3>
            A visualization of motor vehicle collisions
            in NYC on 6/22/2017.<br />
            Click on markers for collision details.</h3>
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
            <FilterFormContainer />
          </aside>
          <MapContainer />
        </div>
        <HighlightContainer />
      </div>
    );
  }
}

export default Search;
