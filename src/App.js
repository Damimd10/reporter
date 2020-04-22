import React, { useState } from 'react';
import useSWR from 'swr';

import Skeleton from '@yisheng90/react-loading';

import Header from './components/Header';
import Profile from './components/Profile';

import client from './client';

import './app.css';

const QUERY = `
query($name: String!) {
  user(login: $name) {
    avatarUrl
    bio
    company
    createdAt
    email
    id
    location
    login
    name
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
    pinnedRepositories {
      totalCount
    }
    repositories(first: 0, affiliations: [OWNER]) {
      totalCount
    }
    starredRepositories {
      totalCount
    }
  }
}
`;

const App = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [variables, setVariables] = useState({});

  const { data } = useSWR(shouldFetch ? QUERY : null, (query) => client.request(query, variables));

  const handleSearchUser = (username) => {
    setVariables({ name: username });
    setShouldFetch(true);
  };

  return (
    <div className="app-container">
      <Header onSearchUser={handleSearchUser} />
      {!data && (
        <div className="app-content columns">
          <div className="column is-3">
            <Profile />
          </div>
          <div className="column">
            <section className="section container has-text-centered is-paddingless">
              <div className="block">
                <Skeleton height="20rem" />
              </div>
              <div className="columns is-multiline">
                <div className="column is-4-desktop">
                  <Skeleton height="10rem" />
                </div>
                <div className="column is-4-desktop">
                  <Skeleton height="10rem" />
                </div>
                <div className="column is-4-desktop">
                  <Skeleton height="10rem" />
                </div>
              </div>
              <div className="columns is-multiline">
                <div className="column is-6-desktop">
                  <Skeleton height="15rem" />
                </div>
                <div className="column is-6-desktop">
                  <Skeleton height="15rem" />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
