import React from 'react';
import { shape } from 'prop-types';
import { groupBy, compose, flatten, map, prop, reduce, toPairs } from 'ramda';
import moment from 'moment';

import { ResponsiveLine } from '@nivo/line';

const getYear = (str) => new Date(str).getFullYear();

const getMonth = (str) => moment(new Date(str)).format('MMM');

const groupByMonthYear = groupBy((c) => `${getMonth(c.date)} ${getYear(c.date)}`);

const getAllContributionDays = compose(flatten, map(prop('contributionDays')));

const sumContributions = reduce((a, c) => a + c.contributionCount, 0);

const parseToDataSet = compose(
  flatten,
  map(([key, value]) => ({ x: key, y: value })),
  toPairs,
);

const getContributions = (collection) => {
  const contributionDays = getAllContributionDays(collection);
  const allContributions = map(sumContributions, groupByMonthYear(contributionDays));

  return parseToDataSet(allContributions);
};

const Contributions = ({ collection }) => {
  const contributionCollection = getContributions(collection);

  const data = [
    {
      id: 'Commits',
      color: 'hsl(93, 70%, 50%)',
      data: contributionCollection,
    },
  ];

  return (
    <ResponsiveLine
      curve="cardinal"
      data={data}
      lineWidth={3}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel={(e) => `${e.x}: ${e.y} Commits`}
      pointLabelYOffset={-12}
      useMesh
    />
  );
};

Contributions.propTypes = {
  collection: shape({}),
};

export default Contributions;
