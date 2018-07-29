import React from 'react';

import ModalTemplate from './modal_template';

import {
  WebsiteIcon,
  GitHubIcon,
  LinkedInIcon,
} from './HeaderIcons';

import {
  FontAwesomeLink,
  IcoMoonLink,
  TrafficSoundLink,
  ToggleSwitchLink,
  LoadingSpinnerLink,
  CollisionDataLink,
  SocrataAPILink,
  GoogleChartLink,
  CustomMarkersLink,
  MarkerClustererLink,
  HeatmapLink,
  TrafficLayerLink,
  StylingWizardLink,
} from './HeaderLinks';

const GoogleMapsCredit = () => (
  <div className="modal-row">
    Google Maps JavaScript API
    <br />
    <CustomMarkersLink />
    <br />
    <MarkerClustererLink />
    <br />
    <HeatmapLink />
    <br />
    <TrafficLayerLink />
    <br />
    <StylingWizardLink />
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
    <br />
    <SocrataAPILink />
  </div>
);

const MiscCredit = () => (
  <div className="modal-row">
    Traffic sound effect:&nbsp;
    <TrafficSoundLink />
    <br />
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

const Credits = props => (
  <ModalTemplate {...props}>
    <h3>
      Credits
    </h3>
    <DavidFengCredit />
    <NYPDCredit />
    <GoogleMapsCredit />
    <IconsCredit />
    <MiscCredit />
  </ModalTemplate>
);

export default Credits;
