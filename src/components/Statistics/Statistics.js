import React from 'react';
import { string, shape } from 'prop-types';
import { compose, filter, pathOr, reduce } from 'ramda';

import { Doughnut, Line } from 'react-chartjs-2';
import Skeleton from '@yisheng90/react-loading';

import { createConfiguration, createData, getContributions, getStatistics } from './helpers';

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

const Statistics = ({ contributions, stats, userName }) => {
  // if (loading) return <StatisticsLogin />;

  const contributionsDataSet = getContributions(contributions);

  const commonConfiguration = createConfiguration(userName);

  const filterByOwner = compose(
    reduce(getStatistics, {}),
    filter(({ node }) => !node.isArchived),
    filter(({ node }) => !node.isFork),
    pathOr([], ['user', 'repositories', 'edges']),
  )(stats);

  const dataSet = filterByOwner;

  const repositoriesPerLanguage = createData(dataSet, 'languages', 'repositories');
  const starsPerLanguage = createData(dataSet, 'languages', 'stars');
  const commitsPerLanguage = createData(dataSet, 'languages', 'commits');
  const starsTopTen = createData(dataSet, 'repositories', 'stars');
  const commitsTopTen = createData(dataSet, 'repositories', 'commits');

  return (
    <section className="box section container has-text-centered is-paddingless layout-container">
      <div className="block chart-section">
        <Line id="contributions" data={contributionsDataSet} {...commonConfiguration} />
      </div>
      <div className="columns is-multiline chart-section">
        <div className="column is-4-desktop">
          {repositoriesPerLanguage.labels.length > 0 && (
            <Doughnut id="by-language" data={repositoriesPerLanguage} {...commonConfiguration} />
          )}
        </div>
        <div className="column is-4-desktop chart-section">
          {starsPerLanguage.labels.length > 0 && (
            <Doughnut id="by-language" data={starsPerLanguage} {...commonConfiguration} />
          )}
        </div>
        <div className="column is-4-desktop chart-section">
          {commitsPerLanguage.labels.length > 0 && (
            <Doughnut id="by-language" data={commitsPerLanguage} {...commonConfiguration} />
          )}
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column is-6-desktop chart-section">
          <Doughnut id="by-language" data={starsTopTen} {...commonConfiguration} />
        </div>
        <div className="column is-6-desktop chart-section">
          <Doughnut id="by-language" data={commitsTopTen} {...commonConfiguration} />
        </div>
      </div>
    </section>
  );
};

Statistics.propTypes = {
  contributions: shape({}).isRequired,
  stats: shape({}).isRequired,
  userName: string.isRequired,
};

export default Statistics;
