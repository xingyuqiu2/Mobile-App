/* eslint-disable react/jsx-filename-extension */
// __tests__/app-test.js
import 'react-native';
import React from 'react';
import { render } from '@testing-library/react';
import {
  ProfileScreen, RepositoriesScreen, FollowingScreen, FollowersScreen,
} from '../view/app';

test('Matches default profile screen snapshot', () => {
  const { asFragment } = render(<ProfileScreen />);
  expect(asFragment()).toMatchSnapshot();
});

test('Matches default repositories screen snapshot', () => {
  const { asFragment } = render(<RepositoriesScreen />);
  expect(asFragment()).toMatchSnapshot();
});

test('Matches default following screen snapshot', () => {
  const { asFragment } = render(<FollowingScreen />);
  expect(asFragment()).toMatchSnapshot();
});

test('Matches default followers screen snapshot', () => {
  const { asFragment } = render(<FollowersScreen />);
  expect(asFragment()).toMatchSnapshot();
});
