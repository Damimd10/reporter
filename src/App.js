import React, { useEffect } from 'react';
import { pathOr, propOr } from 'ramda';
import { useLazyQuery } from '@apollo/client';

import Error from './components/Error';
import Header from './components/Header';
import Profile from './components/Profile';
import Statistics from './components/Statistics';

import useRepositories from './useRepositories';

import { PROFILE } from './queries';

import './app.css';

const App = () => {
  const [getProfile, { data, error, loading }] = useLazyQuery(PROFILE);
  const { repositoriesLoading, repositoriesData, getStats } = useRepositories({
    user: propOr({}, 'user', data),
  });

  const handleSearchUser = (username) => {
    getProfile({ variables: { name: username } });
  };

  useEffect(() => {
    if (data) {
      getStats({ user: data.user });
    }
  }, [data, getStats]);

  const contributions = pathOr(
    [],
    ['user', 'contributionsCollection', 'contributionCalendar', 'weeks'],
    data,
  );

  return (
    <div className="app-container">
      <Header onSearchUser={handleSearchUser} />
      <div className="columns">
        {error ? (
          <Error />
        ) : (
          <>
            <Profile data={data} loading={loading || repositoriesLoading} />
            <Statistics
              contributions={contributions}
              loading={loading || repositoriesLoading}
              stats={repositoriesData}
              userName={pathOr('', ['user', 'login'], data)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
