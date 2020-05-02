import {
  add,
  assocPath,
  compose,
  defaultTo,
  filter,
  flatten,
  groupBy,
  gt,
  inc,
  isNil,
  keys,
  map,
  not,
  path,
  pathOr,
  prop,
  propOr,
  reduce,
  sort,
  subtract,
  take,
  values,
} from 'ramda';
import moment from 'moment';

import {
  DEFAULT_COLORS,
  DEFAULT_OPTIONS,
  LINE_CHART_CONFIGURATION,
  MIN_LANGUAGES,
} from './constants';

const removeEmpties = (data = []) => filter((value) => value !== 0, data);

const removeLowerThan = (statistics, param, x) => (key) => {
  const currentParam = path([key, param], statistics);
  return not(isNil(currentParam)) || gt(currentParam, x);
};

const sortingByParam = (statistics, param) => (a, b) =>
  subtract(pathOr(0, [b, param], statistics), pathOr(0, [a, param], statistics));

const transformStatistics = (statistics = {}) => (accumulator, key) => ({
  ...accumulator,
  [key]: { ...statistics[key] },
});

const addCommits = (key, commits) => add(commits, propOr(0, 'commits')(key));

const addRepository = compose(defaultTo(MIN_LANGUAGES), inc, prop('repositories'));

const addStars = (key, stars) => add(stars, propOr(0, 'stars')(key));

const createLink = (user, data) => {
  const canvas = data[0]._chart.canvas.id;
  const { label } = data[0]._model;
  const redirectByRepository = `https://github.com/${user}/${label}`;
  const redirectByLanguage = `https://github.com/${user}?utf8=%E2%9C%93&tab=repositories&q=&type=source&language=${encodeURIComponent(
    label,
  )}`;

  if (canvas === 'by-repository') return window.open(redirectByRepository, '_blank');

  return window.open(redirectByLanguage, '_blank');
};

const createConfiguration = ({ user, options, legendPosition, hasLegend }) => ({
  options: {
    ...DEFAULT_OPTIONS,
    legend: {
      display: hasLegend,
      position: legendPosition || 'bottom',
      labels: {
        fontSize: 10,
        padding: 8,
        boxWidth: 10,
      },
    },
    ...options,
    // onClick: (...args) => createLink(user, args[1])
  },
});

const getInfo = (data, param) =>
  compose(
    generateDataSet,
    removeEmpties,
    map(prop(param)),
    reduce(transformStatistics(data), {}),
    take(10),
    sort(sortingByParam(data, param)),
    filter(removeLowerThan(data, param, 0)),
    keys,
  )(data);

const createData = (data, from, currentProp) => {
  const info = getInfo(prop(from, data), currentProp);
  return {
    labels: info.labels,
    datasets: [
      {
        data: info.values,
        backgroundColor: DEFAULT_COLORS,
      },
    ],
  };
};

const generateDataSet = (data) => ({
  labels: keys(data),
  values: values(data),
});

const getCommits = pathOr(0, ['node', 'masterBranch', 'target', 'history', 'totalCount']);

const getEdges = path(['user', 'repositories', 'edges']);

const getEndCursor = prop('endCursor');

const getLanguage = pathOr('Unknown', ['node', 'primaryLanguage', 'name']);

const getPageInfo = path(['user', 'repositories', 'pageInfo']);

const getRepository = path(['node', 'name']);

const getStatistics = (accumulator, edge) => {
  const language = getLanguage(edge);
  const repository = getRepository(edge);
  const currentLanguage = path(['languages', language], accumulator);
  const currentRepository = path(['repositories', repository], accumulator);
  const commits = getCommits(edge);
  const stars = getStars(edge);

  return {
    ...accumulator,
    repositories: {
      ...accumulator.repositories,
      [repository]: {
        ...currentRepository,
        ...(!hasForked(edge) && {
          commits: addCommits(currentRepository, commits),
          stars: addStars(currentRepository, stars),
        }),
      },
    },
    languages: {
      ...accumulator.languages,
      [language]: {
        ...currentLanguage,
        commits: addCommits(currentLanguage, commits),
        ...(!hasForked(edge) && {
          repositories: addRepository(currentLanguage),
          stars: addStars(currentLanguage, stars),
        }),
      },
    },
  };
};

const getTotalCount = propOr(0, 'totalCount');
const getStars = pathOr(0, ['node', 'stargazers', 'totalCount']);

const hasForked = path(['node', 'isFork']);

const hasNextPage = propOr(false, 'hasNextPage');

const updateRepositoryData = (repositoryInfo, edges, pageInfo) =>
  compose(
    assocPath(['user', 'repositories', 'edges'], edges),
    assocPath(['user', 'repositories', 'pageInfo'], pageInfo),
  )(repositoryInfo);

/**
 * Contributions
 */

const getYear = (str) => new Date(str).getFullYear();
const getMonth = (str) => moment(new Date(str)).format('MMM');
const groupByMonthYear = groupBy((c) => `${getMonth(c.date)} ${getYear(c.date)}`);
const getAllContributionDays = compose(flatten, map(prop('contributionDays')));
const sumContributions = reduce((a, c) => a + c.contributionCount, 0);

const getContributions = (contributions) => {
  const contributionDays = getAllContributionDays(contributions);
  const parsedContributions = map(sumContributions, groupByMonthYear(contributionDays));

  const contributionsDataSet = {
    labels: keys(parsedContributions),
    datasets: [
      {
        ...LINE_CHART_CONFIGURATION,
        data: values(parsedContributions),
      },
    ],
  };

  return contributionsDataSet;
};

export {
  createConfiguration,
  createData,
  getAllContributionDays,
  getContributions,
  getEdges,
  getEndCursor,
  getPageInfo,
  getStatistics,
  getTotalCount,
  groupByMonthYear,
  hasNextPage,
  sumContributions,
  updateRepositoryData,
};
