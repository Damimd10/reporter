import React, { useEffect, useState } from 'react';
import { pathOr, propOr } from 'ramda';
import { useLazyQuery } from '@apollo/client';

import ReactGA from 'react-ga';

import Error from './components/Error';
import Header from './components/Header';
import Profile from './components/Profile';
import Statistics from './components/Statistics';

import useRepositories from './useRepositories';

import { PROFILE } from './queries';

import './app.css';

ReactGA.initialize(process.env.REACT_APP_ANALYTIC_TOKEN);

const App = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [getProfile, { data, error, loading }] = useLazyQuery(PROFILE);
  const { repositoriesLoading, repositoriesData, getStats } = useRepositories({
    user: propOr({}, 'user', data),
  });

  const handleSearchUser = (username) => {
    getProfile({ variables: { name: username } });
  };

  useEffect(() => {
    ReactGA.event({
      action: 'User enter to main screen',
    });
  }, []);

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
            <Profile
              data={data}
              loading={loading || repositoriesLoading}
              toggleProfile={setShowProfile}
              visible={showProfile}
            />

            <Statistics
              contributions={contributions}
              hasProfile={showProfile}
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
