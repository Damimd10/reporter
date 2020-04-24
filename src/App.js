import React from 'react';
import { useLazyQuery } from '@apollo/client';

import Header from './components/Header';
import Statistics from './components/Statistics';

import { PROFILE } from './queries';

import './app.css';

const App = () => {
  const [getProfile, { data }] = useLazyQuery(PROFILE);

  const handleSearchUser = (username) => {
    getProfile({ variables: { name: username } });
  };

  return (
    <div className="app-container">
      <Header onSearchUser={handleSearchUser} />
      {data && (
        <Statistics
          contributions={data.user.contributionsCollection.contributionCalendar.weeks}
          userId={data.user.id}
          userName={data.user.login}
        />
      )}
    </div>
  );
};

export default App;
