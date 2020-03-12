import React from 'react';
import PropTypes from 'prop-types';

import {
  API_LINK,
} from '../../api';

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
    href={API_LINK}
    text="Source: NYC Open Data"
  />
);

export const GoogleChartLink = () => (
  <HeaderLinks
    href="https://developers.google.com/chart/interactive/docs/gallery/columnchart"
    text="Google Chart - Column Chart"
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
