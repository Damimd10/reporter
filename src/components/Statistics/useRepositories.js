import React from 'react';
import { useQuery } from '@apollo/client';
import { pathOr } from 'ramda';

import updateQuery from './updateQuery';
import { STATISTICS } from '../../queries';

const useRepositories = ({ userId, userName }) => {
  const { data, fetchMore, loading } = useQuery(STATISTICS, {
    variables: { id: userId, name: userName },
    notifyOnNetworkStatusChange: true,
  });

  const { hasNextPage, endCursor } = pathOr(false, ['user', 'repositories', 'pageInfo'], data);

  React.useEffect(() => {
    if (hasNextPage) {
      fetchMore({
        query: STATISTICS,
        variables: {
          id: userId,
          name: userName,
          cursor: endCursor,
        },
        updateQuery,
      });
    }
  }, [endCursor, hasNextPage]);

  const parsedData = (pathOr([], ['user', 'repositories', 'edges']), data);

  return {
    data: parsedData,
    loading,
  };
};

export default useRepositories;
