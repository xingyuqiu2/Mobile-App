import TOKEN from './token';

let username = 'xingyuq2';

export const getName = () => username;

export const setName = (name) => {
  username = name;
};

export const BASE_URL = 'https://api.github.com/graphql';

export const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `bearer ${TOKEN}`,
};

// graphQL query to get information in profile screen
export const queryPr = (userName) => ({
  query: `query { 
            user(login: "${userName}") {
              avatarUrl
              name
              login
              bio
              websiteUrl
              email
              repositories {
                totalCount
              }
              following {
                totalCount
              }
              followers {
                totalCount
              }
              createdAt
            }
          }`,
});

// graphQL query to get information in repositories screen
export const queryRe = (userName) => ({
  query: `query { 
      user(login:"${userName}") {
        repositories {
          totalCount
        }
        repositories {
          nodes{
            name
            owner {
              login
            }
            description
          }
        }
      }
    }`,
});

// graphQL query to get information in followers and following screen
export const getQueryFollow = (userName, type) => ({
  query: `query { 
    user(login:"${userName}") {
      ${type} {
        totalCount
      }
      ${type} {
        nodes{
          avatarUrl
          name
          login
        }
      }
    }
  }`,
});
