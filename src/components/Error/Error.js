import React from 'react';

import MonsterError from '../../assets/404-monster.svg';

import './error.css';

const Error = () => (
  <div className="box has-text-centered error-container">
    <img alt="Error" src={MonsterError} />
    <span className="heading is-size-5 error-text">Sorry ! We cannot find the user you are looking for</span>
  </div>
);

export default Error;
