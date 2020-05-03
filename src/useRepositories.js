import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { pathOr } from 'ramda';

import updateQuery from './components/Statistics/updateQuery';
import { STATISTICS } from './queries';

const useRepositories = ({ user }) => {
  const { id, login } = user;
  const [getStats, { data, fetchMore, loading }] = useLazyQuery(STATISTICS, {
    variables: { id, name: login },
    notifyOnNetworkStatusChange: true,
  });

  const { hasNextPage, endCursor } = pathOr(false, ['user', 'repositories', 'pageInfo'], data);

  useEffect(() => {
    if (hasNextPage) {
      fetchMore({
        query: STATISTICS,
        variables: {
          id,
          name: login,
          cursor: endCursor,
        },
        updateQuery,
      });
    }
  }, [endCursor, fetchMore, hasNextPage, id, login, user]);

  const parsedData = (pathOr([], ['user', 'repositories', 'edges']), data);

  return {
    getStats,
    repositoriesLoading: loading,
    repositoriesData: parsedData,
  };
};

export default useRepositories;
