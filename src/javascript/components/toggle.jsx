import React from 'react';

const Toggle = props => (
  <div>
    <label htmlFor={props.label}>
      {props.label}
    </label>
    <label className="switch">
      <input id={props.label} type="checkbox" {...props} />
      <span className="slider round" />
    </label>
  </div>
);

export default Toggle;
