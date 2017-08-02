import React from 'react';

import ModalTemplate from './modal_template';

const Credits = props => {
  return (
    <ModalTemplate {...props}>
      <h3>Credits</h3>
      <p className="extra-panel-row">
        Designer: <a href='https://davidfeng.us/' target="_blank">
        Ge "David" Feng</a>
      </p>
      <p className="extra-panel-row">
        Developer: <a href='https://davidfeng.us/' target="_blank">
        Ge "David" Feng</a>
      </p>
      <p className="extra-panel-row">
        Icons: <a href='http://fontawesome.io/' target="_blank">
        Font Awesome</a>
      </p>
      <p className="extra-panel-row">
        Traffic sound effect: <a href='https://www.youtube.com/watch?v=cX-1TfLP_y0' target="_blank">
        Partners In Rhyme</a>
      </p>
      <p className="extra-panel-row">
        Toggle switch: <a href='https://www.w3schools.com/howto/howto_css_switch.asp' target="_blank">
        W3schools</a>
      </p>
      <p className="extra-panel-row">
        Google Maps alternative style: <a href='https://mapstyle.withgoogle.com/' target="_blank">
        Google Maps APIs Styling Wizard</a>
      </p>

    </ModalTemplate>
  );
};

export default Credits;
