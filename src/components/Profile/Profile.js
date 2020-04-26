import React from 'react';
import { bool, shape } from 'prop-types';
import moment from 'moment';

import Fade from 'react-reveal';
import Skeleton from '@yisheng90/react-loading';

import FollowBox from '../FollowBox';
import InfoBox from '../InfoBox';

import './profile.css';

const ProfileLoading = () => (
  <Fade>
    <div className="column is-3 layout-profile">
      <div className="avatar avatar-container">
        <Skeleton circle width={200} />
      </div>
      <Skeleton height="3rem" />
      <Skeleton height="1.5rem" />
      <div className="columns follow-info">
        <div className="column is-paddingless">
          <Skeleton height="8rem" />
        </div>
      </div>
      <Skeleton height="2rem" rows={6} />
    </div>
  </Fade>
);

const Profile = ({ data, loading }) => {
  if (loading) return <ProfileLoading />;
  if (!data) return null;

  const {
    user: {
      avatarUrl,
      bio,
      createdAt,
      followers,
      following,
      name,
      pinnedRepositories,
      repositories,
      starredRepositories,
    },
  } = data;

  return (
    <Fade>
      <section className="box section container has-text-centered layout-container layout-profile">
        <div className="profile column is-narrow is-paddingless">
          <section className="profile is-centered">
            <div className="avatar avatar-container">
              <figure className="image is-256x256">
                <img alt="Avatar" className="is-rounded" src={avatarUrl} />
              </figure>
            </div>
            <span className="is-size-1">{name}</span>
            <span className="is-size-6 bio-text">{bio}</span>
            <div className="columns follow-info">
              <div className="column is-paddingless follow-boxes">
                <FollowBox
                  icon="fas fa-user-check"
                  quantity={followers.totalCount}
                  title="Followers"
                />
                <FollowBox
                  icon="fas fa-user-plus"
                  quantity={following.totalCount}
                  title="Following"
                />
              </div>
            </div>
            <div className="profile-info-container">
              <InfoBox icon="fas fa-history" title={`Joined ${moment(createdAt).fromNow()}`} />
              <InfoBox icon="fab fa-github" title={`${repositories.totalCount} Repositories`} />
              <InfoBox icon="fas fa-thumbtack" title={`${pinnedRepositories.totalCount} Pinned`} />
              <InfoBox icon="fas fa-star" title={`${starredRepositories.totalCount} Starred`} />
            </div>
          </section>
        </div>
      </section>
    </Fade>
  );
};

Profile.propTypes = {
  data: shape({}),
  loading: bool.isRequired,
};

export default Profile;
