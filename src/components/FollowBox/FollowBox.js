import React from 'react';
import { number, string } from 'prop-types';

import numeral from 'numeral';

import './follow-box.css';

const FollowBox = ({ icon, quantity, title }) => (
  <div className="column is-paddingless">
    <div className="level-item has-text-centered">
      <i className={`${icon} fa-lg`} />
      <div className="profile-follow-stat">
        <p className="heading">{title}</p>
        <p className="heading title is-size-5">{numeral(quantity).format('0.a')}</p>
      </div>
    </div>
  </div>
);

FollowBox.propTypes = {
  icon: string.isRequired,
  quantity: number.isRequired,
  title: string.isRequired,
};

export default FollowBox;
