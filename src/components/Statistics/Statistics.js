import React from 'react';

import Skeleton from '@yisheng90/react-loading';

const Statistics = () => {
  return (
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
};

export default Statistics;
