import React, { useState } from 'react';
import useSWR from 'swr';

import Header from './components/Header';
import Profile from './components/Profile';
import Statistics from './components/Statistics';

import client from './client';
import { PROFILE } from './queries';

import './app.css';

const App = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [variables, setVariables] = useState({});

  const { data } = useSWR(shouldFetch ? PROFILE : null, (query) =>
    client.request(query, variables),
  );

  const handleSearchUser = (username) => {
    setVariables({ name: username });
    setShouldFetch(true);
  };

  const isLoading = shouldFetch && !data;

  console.log('HERE', data);

  return (
    <div className="app-container">
      <Header onSearchUser={handleSearchUser} />
      <div className="app-content columns">
        <div className="column is-3">
          {isLoading || (data && <Profile loading={isLoading} user={data && data.user} />)}
        </div>
        <div className="column">
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default App;
