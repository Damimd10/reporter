import React from 'react';
import { useLazyQuery } from '@apollo/client';

import Header from './components/Header';
import Profile from './components/Profile';
import Statistics from './components/Statistics';

import { PROFILE } from './queries';

import './app.css';

const App = () => {
  const [getProfile, { data, loading }] = useLazyQuery(PROFILE);

  const handleSearchUser = (username) => {
    getProfile({ variables: { name: username } });
  };

  return (
    <div className="app-container">
      <Header onSearchUser={handleSearchUser} />
      <div className="app-content columns">
        <div className="column is-3">
          <Profile loading={loading} data={data} />
        </div>
        <div className="column">
          {data && (
            <Statistics
              contributions={data.user.contributionsCollection.contributionCalendar.weeks}
              userId={data.user.id}
              userName={data.user.login}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
