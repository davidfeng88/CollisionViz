import React from 'react';

import ModalTemplate from './modal_template';

const AboutMe = props => (
  <ModalTemplate {...props}>
    <h3>About Me</h3>
    <p>Hello, I'm David Feng. Let's stay in touch!</p>
    <div className='flex-row'>
      <a className='clickable-div' href='https://davidfeng.us/' target='_blank'>
      <img src='./assets/images/font-awesome/user.png' />
      </a>
      <a className='clickable-div'
        href='https://github.com/davidfeng88' target='_blank'>
      <img src='./assets/images/font-awesome/github.png' />
      </a>
      <a className='clickable-div'
        href='https://www.linkedin.com/in/gfeng/' target='_blank'>
      <img src='./assets/images/font-awesome/linkedin-square.png' />
      </a>
      <a className='clickable-div'
        href='https://angel.co/ge-david-feng' target='_blank'>
      <img src='./assets/images/font-awesome/angellist.png' />
      </a>
    </div>
  </ModalTemplate>
);

export default AboutMe;
