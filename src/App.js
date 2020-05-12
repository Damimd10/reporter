import React, { useEffect, useState } from 'react';
import { pathOr, propOr } from 'ramda';
import { useLazyQuery } from '@apollo/client';

import ReactGA from 'react-ga';

import Error from './components/Error';
import Header from './components/Header';
import MediaContainer from './components/MediaContainer';
import Profile from './components/Profile';
import Statistics from './components/Statistics';

import useRepositories from './useRepositories';

import history from './history';

import { PROFILE } from './queries';

import './app.css';

ReactGA.initialize(process.env.REACT_APP_ANALYTIC_TOKEN);

const { pathname } = history.location;

const App = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [getProfile, { data, error, loading }] = useLazyQuery(PROFILE);
  const { repositoriesLoading, repositoriesData, getStats } = useRepositories({
    user: propOr({}, 'user', data),
  });

  const handleSearchUser = (username) => {
    getProfile({ variables: { name: username.trim() } });
  };

  const hasInitialUser = () => {
    return pathname !== '/';
  };

  useEffect(() => {
    if (hasInitialUser()) {
      const githubUser = pathname.substring(1);
      getProfile({ variables: { name: githubUser } });
    }

    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }, [getProfile]);

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
      <Header
        {...(hasInitialUser() ? { initialValue: pathname.substring(1) } : undefined)}
        onSearchUser={handleSearchUser}
      />
      {data && <MediaContainer user={data.user} />}
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
