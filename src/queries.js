export const PROFILE = `
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

export const STATISTICS = '';
