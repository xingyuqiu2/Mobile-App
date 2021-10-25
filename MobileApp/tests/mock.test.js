/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchProfile } from '../controller/profileController';
import { fetchRepositories } from '../controller/repositoriesController';
import { fetchFollow } from '../controller/followController';
import {
  ProfileScreen, RepositoriesScreen, FollowersScreen, FollowingScreen,
} from '../view/app';

const dataPr = {
  data: {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/42951409?v=4',
      name: 'Jerry',
      login: 'xingyuq2',
      bio: 'Senior student',
      websiteUrl: 'https://github.com/xingyuqiu2',
      email: 'xxx@gmail.com',
      repositories: {
        totalCount: 6,
      },
      following: {
        totalCount: 5,
      },
      followers: {
        totalCount: 4,
      },
      createdAt: '2018-09-04T01:11:54Z',
    },
  },
};

const dataRe = {
  data: {
    user: {
      repositories: {
        totalCount: 3,
        nodes: [
          {
            name: 'Lab1',
            owner: {
              login: 'xyz',
            },
            description: 'Lab 1 starter code.',
          },
          {
            name: 'Lab2',
            owner: {
              login: 'qwe',
            },
            description: 'Lab2 code',
          },
          {
            name: 'Lab3',
            owner: {
              login: 'haha',
            },
            description: 'Fall 2018 Lab3 starter code.',
          },
        ],
      },
    },
  },
};

const dataFollowing = {
  data: {
    user: {
      following: {
        totalCount: 3,
        nodes: [
          {
            avatarUrl: 'https://avatars.githubusercontent.com/u/12994887?u=6bfec84cb512892557cfed7fd7c52b0b0f41f95b&v=4',
            name: 'Tom',
            login: 'tom2',
          },
          {
            avatarUrl: 'https://avatars.githubusercontent.com/u/12994887?u=6bfec84cb512892557cfed7fd7c52b0b0f41f95b&v=4',
            name: 'Jerry',
            login: 'jerry2',
          },
          {
            avatarUrl: 'https://avatars.githubusercontent.com/u/12994887?u=6bfec84cb512892557cfed7fd7c52b0b0f41f95b&v=4',
            name: '稚晖',
            login: 'peng-zhihui',
          },
        ],
      },
    },
  },
};

const dataFollowers = {
  data: {
    user: {
      followers: {
        totalCount: 2,
        nodes: [
          {
            avatarUrl: 'https://avatars.githubusercontent.com/u/12994887?u=6bfec84cb512892557cfed7fd7c52b0b0f41f95b&v=4',
            name: 'Max',
            login: 'max2',
          },
          {
            avatarUrl: 'https://avatars.githubusercontent.com/u/12994887?u=6bfec84cb512892557cfed7fd7c52b0b0f41f95b&v=4',
            name: 'Min',
            login: 'min2',
          },
        ],
      },
    },
  },
};

const dataError = {
  data: {
    user: null,
  },
  errors: [
    {
      type: 'NOT_FOUND',
      path: [
        'user',
      ],
      locations: [
        {
          line: 7,
          column: 5,
        },
      ],
      message: "Could not resolve to a User with the login of 'cs125-student'.",
    },
  ],
};

beforeEach(() => {
  global.fetch.resetMocks();
});

test('returns result from fetchProfile if valid data', () => {
  global.fetch.mockResponseOnce(JSON.stringify(dataPr));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetchProfile(true)
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual(dataPr);
    });
});

test('Matches loaded profile screen snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataPr));
    const { asFragment } = render(<ProfileScreen />);
    await waitForElementToBeRemoved(screen.getByText('x repos'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('Matches profile screen under error snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataError));
    const { asFragment } = render(<ProfileScreen />);
    await waitForElementToBeRemoved(screen.getByText('x repos'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('returns result from fetchRepositories if valid data', () => {
  global.fetch.mockResponseOnce(JSON.stringify(dataRe));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetchRepositories(true)
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual(dataRe);
    });
});

test('Matches loaded repositories screen snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataRe));
    const { asFragment } = render(<RepositoriesScreen />);
    await waitForElementToBeRemoved(screen.getByText('Repo name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('Matches repositories screen under error snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataError));
    const { asFragment } = render(<RepositoriesScreen />);
    await waitForElementToBeRemoved(screen.getByText('Repo name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('returns result from fetchFollowing if valid data', () => {
  global.fetch.mockResponseOnce(JSON.stringify(dataFollowing));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetchFollow(true, 'following')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual(dataFollowing);
    });
});

test('Matches loaded following screen snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataFollowing));
    const { asFragment } = render(<FollowingScreen />);
    await waitForElementToBeRemoved(screen.getByText('Name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('Matches following screen under error snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataError));
    const { asFragment } = render(<FollowingScreen />);
    await waitForElementToBeRemoved(screen.getByText('Name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('returns result from fetchFollowers if valid data', () => {
  global.fetch.mockResponseOnce(JSON.stringify(dataFollowers));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetchFollow(true, 'followers')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual(dataFollowers);
    });
});

test('Matches loaded followers screen snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataFollowers));
    const { asFragment } = render(<FollowersScreen />);
    await waitForElementToBeRemoved(screen.getByText('Name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});

test('Matches followers screen under error snapshot', async () => {
  await act(async () => {
    global.fetch.mockResponseOnce(JSON.stringify(dataError));
    const { asFragment } = render(<FollowersScreen />);
    await waitForElementToBeRemoved(screen.getByText('Name:Loading'));
    expect(asFragment()).toMatchSnapshot();
  });
});
