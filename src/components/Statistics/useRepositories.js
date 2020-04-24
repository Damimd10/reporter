import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { pathOr } from 'ramda';

import updateQuery from './updateQuery';
import { STATISTICS } from '../../queries';

const useRepositories = ({ userId, userName }) => {
  const [repositories, setRepositories] = useState(null);
  const { data, fetchMore, loading } = useQuery(STATISTICS, {
    variables: { id: userId, name: userName },
    notifyOnNetworkStatusChange: true,
  });

  const { hasNextPage, endCursor } = pathOr(false, ['user', 'repositories', 'pageInfo'], data);

  useEffect(() => {
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
  }, [data, endCursor, fetchMore, hasNextPage, userId, userName]);

  useEffect(() => {
    if (!hasNextPage) {
      const parsedData = (pathOr([], ['user', 'repositories', 'edges']), data);
      setRepositories(parsedData);
    }
  }, [data, hasNextPage])

  return  {
    data: repositories,
    loading,
  };
};

export default useRepositories;
