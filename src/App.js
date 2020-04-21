import React, { useState } from 'react';
import useSWR from 'swr';

import Header from './components/Header';

import client from './client';

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

  const pr = useSWR(shouldFetch ? QUERY : null, (query) => client.request(query, variables));
  console.log('HERE', pr);

  const handleSearchUser = (username) => {
    setShouldFetch(true);
    setVariables({ name: username });
  };

  return (
    <div>
      <Header onSearchUser={handleSearchUser} />
    </div>
  );
};

export default App;
