import React from 'react';

import {
  WebsiteIcon,
  GitHubIcon,
  LinkedInIcon,
} from './HeaderIcons';

import {
  FontAwesomeLink,
  IcoMoonLink,
  ToggleSwitchLink,
  LoadingSpinnerLink,
  CollisionDataLink,
  GoogleChartLink,
  MarkerClustererLink,
  HeatmapLink,
} from './HeaderLinks';

const GoogleMapsCredit = () => (
  <div className="modal-row">
    Google Maps JavaScript API
    <br />
    <MarkerClustererLink />
    <br />
    <HeatmapLink />
  </div>
);

const DavidFengCredit = () => (
  <div className="modal-row">
    <p>
      Developer:&nbsp;David&nbsp;Feng
    </p>
    <div className="flex-row">
      <WebsiteIcon />
      <GitHubIcon />
      <LinkedInIcon />
    </div>
  </div>
);

const IconsCredit = () => (
  <div className="modal-row">
    Icons:&nbsp;
    <FontAwesomeLink />
    <br />
    Icons PNG generation:&nbsp;
    <IcoMoonLink />
  </div>
);

const NYPDCredit = () => (
  <div className="modal-row">
    NYPD Motor Vehicle Collisions Data
    <br />
    <CollisionDataLink />
  </div>
);

const MiscCredit = () => (
  <div className="modal-row">
    Toggle switch:&nbsp;
    <ToggleSwitchLink />
    <br />
    Loading spinner:&nbsp;
    <LoadingSpinnerLink />
    <br />
    Chart:&nbsp;
    <GoogleChartLink />
  </div>
);

const Credits = () => (
  <div>
    <h3>
      Credits
    </h3>
    <DavidFengCredit />
    <NYPDCredit />
    <GoogleMapsCredit />
    <IconsCredit />
    <MiscCredit />
  </div>
);

export default Credits;
