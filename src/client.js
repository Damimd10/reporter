import { GraphQLClient } from 'graphql-request';

const ENDPOINT = 'https://api.github.com/graphql';

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

export default client;
