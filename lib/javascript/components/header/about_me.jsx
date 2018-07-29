import React from 'react';

import ModalTemplate from './modal_template';

const AboutMe = props => (
  <ModalTemplate {...props}>
    <h3>
About Me
    </h3>
    <p>
      Hello, I&apos;m David Feng. Let&apos;s stay in touch!
    </p>
    <div className="flex-row">
      <a
        className="clickable-div"
        href="https://davidfeng.us/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/images/font-awesome/user.png" alt="" />
      </a>
      <a
        className="clickable-div"
        href="https://github.com/davidfeng88"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/images/font-awesome/github.png" alt="" />
      </a>
      <a
        className="clickable-div"
        href="https://www.linkedin.com/in/gfeng/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/images/font-awesome/linkedin-square.png" alt="" />
      </a>
      <a
        className="clickable-div"
        href="https://angel.co/ge-david-feng"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/images/font-awesome/angellist.png" alt="" />
      </a>
    </div>
  </ModalTemplate>
);

export default AboutMe;
