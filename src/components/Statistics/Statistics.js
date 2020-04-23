import React from 'react';
import { string } from 'prop-types';

import Skeleton from '@yisheng90/react-loading';

import useRepositories from './useRepositories';

const StatisticsLogin = () => (
  <section className="section container has-text-centered is-paddingless">
    <div className="block">
      <Skeleton height="20rem" />
    </div>
    <div className="columns is-multiline">
      <div className="column is-4-desktop">
        <Skeleton height="10rem" />
      </div>
      <div className="column is-4-desktop">
        <Skeleton height="10rem" />
      </div>
      <div className="column is-4-desktop">
        <Skeleton height="10rem" />
      </div>
    </div>
    <div className="columns is-multiline">
      <div className="column is-6-desktop">
        <Skeleton height="15rem" />
      </div>
      <div className="column is-6-desktop">
        <Skeleton height="15rem" />
      </div>
    </div>
  </section>
);

const Statistics = ({ userId, userName }) => {
  const { data, loading } = useRepositories({ userId, userName });

  if (loading) return <StatisticsLogin />

  console.log('HERE', data);

  return (
    <section className="section container has-text-centered is-paddingless">
      <div className="block">
        Block
      </div>
      <div className="columns is-multiline">
        <div className="column is-4-desktop">
          Block
        </div>
        <div className="column is-4-desktop">
          Block
        </div>
        <div className="column is-4-desktop">
          Block
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column is-6-desktop">
          Block
        </div>
        <div className="column is-6-desktop">
          Block
        </div>
      </div>
    </section>
  );
};

Statistics.propTypes = {
  userId: string.isRequired,
  userName: string.isRequired,
};

export default Statistics;
