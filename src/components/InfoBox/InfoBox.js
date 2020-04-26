import React from 'react';
import { string } from 'prop-types';

import './info-box.css';

const InfoBox = ({ icon, title }) => (
  <div className="level">
    <div className="level-left">
      <div className="level-item">
        <span className="icon">
          <i className={`${icon} fa-2x`} />
        </span>
        <span className="heading profile-info-stat is-size-6">{title}</span>
      </div>
    </div>
  </div>
);

InfoBox.propTypes = {
  icon: string.isRequired,
  title: string.isRequired,
};

export default InfoBox;
