import React from 'react';

import Skeleton from '@yisheng90/react-loading';

import './profile.css';

const Profile = () => (
  <section className="section container has-text-centered is-paddingless">
    <div className="profile column is-narrow is-paddingless">
      <section className="profile is-centered">
        <div className="avatar">
          <Skeleton circle width={200} />
        </div>
        <Skeleton height="3rem" />
        <Skeleton height="1.5rem" />
        <div className="columns follow-info">
          <div className="column is-paddingless">
            <Skeleton height="8rem" />
          </div>
          <div className="column is-paddingless">
            <Skeleton height="8rem" />
          </div>
        </div>
        <Skeleton height="2rem" rows={6} />
      </section>
    </div>
  </section>
);

export default Profile;
