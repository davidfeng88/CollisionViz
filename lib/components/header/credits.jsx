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
        Traffic sound effect: <a href='https://www.youtube.com/watch?v=cX-1TfLP_y0' target="_blank">
        Partners In Rhyme</a>
      </p>
      <p className="extra-panel-row">
        Toggle switch: <a href='https://www.w3schools.com/howto/howto_css_switch.asp' target="_blank">
        W3schools</a>
      </p>
      <p className="extra-panel-row">
        Loading spinner: <a href='https://loading.io/' target="_blank">
        loading.io</a>
      </p>
      <p className="extra-panel-row">
        <a href='https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb' target="_blank">
        NYPD Motor Vehicle Collisions API</a>
      </p>
      <p className="extra-panel-row">
        Google Maps JavaScript API<br/>
        <a href='https://developers.google.com/maps/documentation/javascript/custom-markers'
          target="_blank">Custom Markers</a><br />
        <a href='https://developers.google.com/maps/documentation/javascript/heatmaplayer'
          target="_blank">Heatmap Layer</a><br />
        <a href='https://developers.google.com/maps/documentation/javascript/trafficlayer'
          target="_blank">Traffic, Transit and Bicycling Layer</a><br />
        <a href='https://mapstyle.withgoogle.com/' target="_blank">
        Google Maps APIs Styling Wizard</a>
      </p>

    </ModalTemplate>
  );
};

export default Credits;
