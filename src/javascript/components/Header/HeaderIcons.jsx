import React from 'react';
import PropTypes from 'prop-types';

const HeaderIcon = ({ href, src }) => (
  <a
    className="clickable-div"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={src} alt="" />
  </a>
);

HeaderIcon.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export const WebsiteIcon = () => (
  <HeaderIcon
    href="https://davidfeng.us/"
    src="./assets/font-awesome/user.png"
  />
);

export const GitHubIcon = () => (
  <HeaderIcon
    href="https://github.com/davidfeng88"
    src="./assets/font-awesome/github.png"
  />
);

export const LinkedInIcon = () => (
  <HeaderIcon
    href="https://www.linkedin.com/in/gfeng/"
    src="./assets/font-awesome/linkedin-square.png"
  />
);
