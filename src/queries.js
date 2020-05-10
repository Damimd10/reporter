import { gql } from '@apollo/client';

export const PROFILE = gql`
  query Profile($name: String!) {
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
      pinnedItems(types: REPOSITORY) {
        totalCount
      }
      repositories(ownerAffiliations: OWNER) {
        totalCount
      }
      starredRepositories {
        totalCount
      }
    }
  }
`;

export const STATISTICS = gql`
  query($name: String!, $id: ID!, $cursor: String) {
    user(login: $name) {
      id
      repositories(
        first: 100
        after: $cursor
        orderBy: { direction: DESC, field: STARGAZERS }
        ownerAffiliations: OWNER
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            owner {
              login
            }
            name
            isArchived
            isFork
            primaryLanguage {
              name
              color
            }
            stargazers {
              totalCount
            }
            masterBranch: ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  history(first: 0, author: { id: $id }) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
