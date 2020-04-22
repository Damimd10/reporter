import React from 'react';
import { bool, shape } from 'prop-types';
import moment from 'moment';

import Skeleton from '@yisheng90/react-loading';

import FollowBox from '../FollowBox';
import InfoBox from '../InfoBox';

import './profile.css';

const ProfileLoading = () => (
  <>
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
  </>
);

const Profile = ({ isLoading, user }) => {
  if (isLoading) return <ProfileLoading />;

  return (
    <section className="section container has-text-centered is-paddingless">
      <div className="profile column is-narrow is-paddingless">
        <section className="profile is-centered">
          <div className="avatar">
            <figure className="image is-480x480">
              <img alt="Avatar" className="is-rounded" src={user.avatarUrl} />
            </figure>
          </div>
          <span className="is-size-1">{user.name}</span>
          <span className="is-size-6">{user.bio}</span>
          <div className="columns follow-info">
            <div className="column is-paddingless">
              <FollowBox
                icon="fas fa-user-check"
                quantity={user.followers.totalCount}
                title="Followers"
              />
              <FollowBox
                icon="fas fa-user-plus"
                quanitity={user.following.totalCount}
                title="Following"
              />
            </div>
          </div>
          <div className="profile-info-container">
            <InfoBox
              icon="fas fa-history"
              title={`Joined Github ${moment(user.createdAt).fromNow()}`}
            />
            <InfoBox icon="fab fa-github" title={`${user.repositories.totalCount} Repositories`} />
            <InfoBox
              icon="fas fa-thumbtack"
              title={`${user.pinnedRepositories.totalCount} Pinned Repositories`}
            />
            <InfoBox
              icon="fas fa-star"
              title={`${user.starredRepositories.totalCount} Starred Repositories`}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

Profile.propTypes = {
  isLoading: bool.isRequired,
  user: shape({}),
};

export default Profile;
