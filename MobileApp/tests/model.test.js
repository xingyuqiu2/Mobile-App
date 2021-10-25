// __tests__/profile-test.js
// __tests__/repositories-test.js
import Profile from '../model/profile';
import Repository from '../model/repository';

test('data with empty value sent to Profile constructor', () => {
  const data = {
    name: '',
    login: '',
    bio: '',
  };
  const myProfile = new Profile(data);
  expect(myProfile.name).toBe('Unknown name');
  expect(myProfile.userName).toBe('Unknown username');
  expect(myProfile.bio).toBe('Empty');
});

test('invalid data sent to Profile constructor', () => {
  const data = [
    {
      name: 'tom',
      login: 'ert',
      bio: 'hi',
    },
  ];
  const myProfile = new Profile(data);
  expect(myProfile.name).toBe('Unknown name');
  expect(myProfile.userName).toBe('Unknown username');
  expect(myProfile.bio).toBe('Empty');
});

test('valid data sent to Profile constructor', () => {
  const data = {
    name: 'Jerry',
    login: 'xingyuq2',
    bio: 'a student',
  };
  const myProfile = new Profile(data);
  expect(myProfile.name).toBe('Jerry');
  expect(myProfile.userName).toBe('xingyuq2');
  expect(myProfile.bio).toBe('a student');
});

test('data with empty value sent to Repository constructor', () => {
  const data = [
    {
      name: '',
      owner: {
        login: '',
      },
      description: '',
    },
  ];
  const myRepository = new Repository(data);
  expect(myRepository.repoNames[0]).toBe('Unknown repo name');
  expect(myRepository.users[0]).toBe('Unknown username');
  expect(myRepository.descriptions[0]).toBe('Empty');
});

test('invalid data sent to Repository constructor', () => {
  const data = {
    name: '',
    owner: {
      login: '',
    },
    description: '',
  };
  const myRepository = new Repository(data);
  expect(myRepository.repoNames).toStrictEqual([]);
  expect(myRepository.users).toStrictEqual([]);
  expect(myRepository.descriptions).toStrictEqual([]);
});

test('valid data sent to Repository constructor', () => {
  const data = [
    {
      name: 'MP1',
      owner: {
        login: 'qqqwww',
      },
      description: 'First Machine Problem',
    },
  ];
  const myRepository = new Repository(data);
  expect(myRepository.repoNames[0]).toBe('MP1');
  expect(myRepository.users[0]).toBe('qqqwww');
  expect(myRepository.descriptions[0]).toBe('First Machine Problem');
});
