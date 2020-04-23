import React from 'react';
import { string, shape } from 'prop-types';

import Skeleton from '@yisheng90/react-loading';

import useRepositories from './useRepositories';
import Contributions from './components/Contributions';

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

const Statistics = ({ contributions, userId, userName }) => {
  const { data, loading } = useRepositories({ userId, userName });

  if (loading) return <StatisticsLogin />

  return (
    <section className="section container has-text-centered is-paddingless">
      <div className="block" style={{ height: '400px'}}>
        <Contributions collection={contributions} />
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
  contributions: shape({}),
  userId: string.isRequired,
  userName: string.isRequired,
};

export default Statistics;
