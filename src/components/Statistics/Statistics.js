import React from 'react';
import { bool, shape, string } from 'prop-types';
import { compose, filter, pathOr, reduce } from 'ramda';
import { isMobile } from 'react-device-detect';

import { Doughnut, Line } from 'react-chartjs-2';
import Fade from 'react-reveal';
import Skeleton from '@yisheng90/react-loading';

import { createConfiguration, createData, getContributions, getStatistics } from './helpers';

const StatisticsLogin = () => (
  <Fade>
    <section
      className="box section container has-text-centered layout-container"
      style={{ maxWidth: '75vw' }}
    >
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
  </Fade>
);

const Statistics = ({ contributions, hasProfile, loading, stats, userName }) => {
  if (loading) return <StatisticsLogin />;
  if (!userName) return null;

  const contributionsDataSet = getContributions(contributions);

  const contributionConfiguration = createConfiguration({
    legendOptions: { position: 'bottom' },
    options: { maintainAspectRatio: false },
    userName,
  });

  const commonConfiguration = createConfiguration({
    legendOptions: { position: isMobile ? 'bottom' : 'left' },
    userName,
  });

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

  const maxWidth = isMobile ? '100vw' : hasProfile ? '75vw' : '100vw';

  return (
    <Fade>
      <section
        className="box section container has-text-centered layout-container"
        data-cy="statistic-box"
        style={{ maxWidth }}
      >
        <div className="block chart-section contributions-chart" data-cy="contributions-chart">
          <span className="heading is-size-4 chart-title">Contributions in last year</span>
          <Line id="contributions" data={contributionsDataSet} {...contributionConfiguration} />
        </div>
        <div className="columns is-multiline chart-section">
          <div className="column is-4-desktop chart-section" data-cy="repositories-language-chart">
            <span className="heading is-size-6 chart-title">Repositories Per Language</span>
            {repositoriesPerLanguage.labels.length > 0 && (
              <Doughnut id="by-language" data={repositoriesPerLanguage} {...commonConfiguration} />
            )}
          </div>
          <div className="column is-4-desktop chart-section" data-cy="stars-language-chart">
            <span className="heading is-size-6 chart-title">Stars Per Language</span>
            {starsPerLanguage.labels.length > 0 && (
              <Doughnut id="by-language" data={starsPerLanguage} {...commonConfiguration} />
            )}
          </div>
          <div className="column is-4-desktop chart-section" data-cy="commits-language-chart">
            <span className="heading is-size-6 chart-title">Commits Per Language</span>
            {commitsPerLanguage.labels.length > 0 && (
              <Doughnut id="by-language" data={commitsPerLanguage} {...commonConfiguration} />
            )}
          </div>
        </div>
        <div className="columns is-multiline">
          <div className="column is-6-desktop chart-section" data-cy="top-10-stars">
            <span className="heading is-size-5 chart-title">Top 10 Stars Repo</span>
            <Doughnut id="by-repository" data={starsTopTen} {...commonConfiguration} />
          </div>
          <div className="column is-6-desktop chart-section" data-cy="top-10-commits">
            <span className="heading is-size-5 chart-title">Top 10 Commits Repo</span>
            <Doughnut id="by-repository" data={commitsTopTen} {...commonConfiguration} />
          </div>
        </div>
      </section>
    </Fade>
  );
};

Statistics.propTypes = {
  contributions: shape({}).isRequired,
  hasProfile: bool.isRequired,
  loading: bool.isRequired,
  stats: shape({}).isRequired,
  userName: string.isRequired,
};

export default Statistics;
