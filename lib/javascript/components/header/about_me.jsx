import React from 'react';

import ModalTemplate from './modal_template';

const AboutMe = props => (
  <ModalTemplate {...props}>
    <h3>About Me</h3>
    <p>Hello, I'm David Feng. Let's stay in touch!</p>
    <div className="modal-link-div">
      <a href='https://davidfeng.us/' target="_blank">
      <i className="fa fa-user fa-lg" aria-hidden="true"></i>
      </a>
      <a href='https://github.com/davidfeng88' target="_blank">
      <i className="fa fa-github fa-lg" aria-hidden="true"></i>
      </a>
      <a href='https://www.linkedin.com/in/gfeng/' target="_blank">
      <i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i>
      </a>
      <a href='https://angel.co/ge-david-feng' target="_blank">
      <i className="fa fa-angellist fa-lg" aria-hidden="true"></i>
      </a>
    </div>
  </ModalTemplate>
);

export default AboutMe;
