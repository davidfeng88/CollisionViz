import React from 'react';

const Toggle = props => (
  <label className="switch">
    <input type="checkbox" {...props} />
    <span className="slider round"></span>
  </label>
);

export default Toggle;
