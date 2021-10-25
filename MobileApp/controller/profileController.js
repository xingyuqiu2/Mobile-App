/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import 'node-fetch';
import Profile from '../model/profile';
import {
  getName, setName, BASE_URL, HEADERS, queryPr,
} from './constant';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d6dce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: '#3d322d',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 6,
  },
  touchableText: {
    color: '#3829d7',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 6,
  },
});

/**
 * Fetch profile data using graphQL query.
 * @param {boolean} isMounted
 * @returns response from fetch
 */
export async function fetchProfile(isMounted) {
  if (isMounted) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(queryPr(getName())),
    }).then((res) => res.json());
  }
  return null;
}

/**
 * Call fetchProfile and get data.
 * Then insert value from retreived data to content and return it.
 * @returns loaded profile content
 */
export default function GetProfile(navigation) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getData() {
      const dataReceived = await fetchProfile(isMounted);
      setData(dataReceived);
    }
    getData();
    return () => { isMounted = false; };
  }, []);

  // handle invalid data
  if (!data) {
    return null;
  }
  // handle error
  if (!data.data.user) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Not Found</Text>
      </SafeAreaView>
    );
  }

  // create profile object by passing part of a response
  const myProfile = new Profile(data.data.user);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: myProfile.avatarUrl }} style={styles.image} />

        <Text style={styles.text}>{myProfile.name}</Text>
        <Text style={styles.text}>
          Username:
          {' '}
          {myProfile.userName}
        </Text>
        <Text style={styles.text}>
          Bio:
          {' '}
          {myProfile.bio}
        </Text>
        <Text style={styles.text}>
          Website:
          {' '}
          {myProfile.websiteUrl}
        </Text>
        <Text style={styles.text}>
          Email:
          {' '}
          {myProfile.email}
        </Text>

        <TouchableOpacity onPress={() => {
          setName(myProfile.userName);
          navigation.push('Repositories');
        }}
        >
          <Text style={styles.touchableText}>
            {myProfile.reposCount}
            {' '}
            repos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setName(myProfile.userName);
          navigation.push('Followers');
        }}
        >
          <Text style={styles.touchableText}>
            Followers:
            {' '}
            {myProfile.followersCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setName(myProfile.userName);
          navigation.push('Following');
        }}
        >
          <Text style={styles.touchableText}>
            Following:
            {' '}
            {myProfile.followingCount}
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Creation date:
          {' '}
          {myProfile.createdAt}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

GetProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
