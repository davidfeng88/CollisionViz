import React from 'react';
import PropTypes from 'prop-types';

const HeaderLinks = ({ href, text }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

HeaderLinks.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const RepoLink = () => (
  <HeaderLinks
    href="https://github.com/davidfeng88/CollisionViz"
    text="GitHub Repo"
  />
);

export const FontAwesomeLink = () => (
  <HeaderLinks
    href="http://fontawesome.io/"
    text="Font Awesome"
  />
);

export const IcoMoonLink = () => (
  <HeaderLinks
    href="https://icomoon.io/app/#/select"
    text="IcoMoon"
  />
);

export const TrafficSoundLink = () => (
  <HeaderLinks
    href="https://www.youtube.com/watch?v=cX-1TfLP_y0"
    text="Partners In Rhyme"
  />
);

export const ToggleSwitchLink = () => (
  <HeaderLinks
    href="https://www.w3schools.com/howto/howto_css_switch.asp"
    text="W3schools"
  />
);

export const LoadingSpinnerLink = () => (
  <HeaderLinks
    href="https://loading.io/"
    text="loading.io"
  />
);

export const CollisionDataLink = () => (
  <HeaderLinks
    href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95"
    text="Source: NYC Open Data"
  />
);

export const SocrataAPILink = () => (
  <HeaderLinks
    href="https://dev.socrata.com/foundry/data.cityofnewyork.us/qiz3-axqb"
    text="API: Socrata Open Data"
  />
);

export const GoogleChartLink = () => (
  <HeaderLinks
    href="https://developers.google.com/chart/interactive/docs/gallery/columnchart"
    text="Google Chart - Column Chart"
  />
);

export const CustomMarkersLink = () => (
  <HeaderLinks
    href="https://developers.google.com/maps/documentation/javascript/custom-markers"
    text="Custom Markers"
  />
);

export const MarkerClustererLink = () => (
  <HeaderLinks
    href="https://developers.google.com/maps/documentation/javascript/marker-clustering"
    text="Marker Clusterer"
  />
);

export const HeatmapLink = () => (
  <HeaderLinks
    href="https://developers.google.com/maps/documentation/javascript/heatmaplayer"
    text="Heatmap Layer"
  />
);

export const TrafficLayerLink = () => (
  <HeaderLinks
    href="https://developers.google.com/maps/documentation/javascript/trafficlayer"
    text="Traffic, Transit and Bicycling Layer"
  />
);

export const StylingWizardLink = () => (
  <HeaderLinks
    href="https://mapstyle.withgoogle.com/"
    text="Google Maps APIs Styling Wizard"
  />
);
