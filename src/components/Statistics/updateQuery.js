import { assocPath, compose, concat, isEmpty, path } from 'ramda';

const getEdges = path(['user', 'repositories', 'edges']);
const getPageInfo = path(['user', 'repositories', 'pageInfo']);

const updateRepositoryData = (repositoryInfo, edges, pageInfo) =>
  compose(
    assocPath(['user', 'repositories', 'edges'], edges),
    assocPath(['user', 'repositories', 'pageInfo'], pageInfo),
  )(repositoryInfo);

export default (previousResult, { fetchMoreResult }) => {
  const newEdges = getEdges(fetchMoreResult);
  if (isEmpty(newEdges)) return previousResult;

  const oldEdges = getEdges(previousResult);
  const pageInfo = getPageInfo(fetchMoreResult);
  const edges = concat(oldEdges, newEdges);

  const updatedData = updateRepositoryData(previousResult, edges, pageInfo);

  return updatedData;
}