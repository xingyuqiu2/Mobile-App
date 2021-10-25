/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, FlatList, Image, TouchableOpacity,
} from 'react-native';
import 'node-fetch';
import Follow from '../model/follow';
import {
  setName, BASE_URL, HEADERS, getQueryFollow, getName,
} from './constant';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d6dce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#3d322d',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 6,
  },
  touchableText: {
    color: '#2a683a',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 6,
  },
  itemWrapperStyle: {
    backgroundColor: '#f3e3c2',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
});

/**
 * Fetch followers/following data using graphQL query.
 * @param {boolean} isMounted
 * @param {string} type followers/following
 * @returns response from fetch
 */
export async function fetchFollow(isMounted, type) {
  if (isMounted) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(getQueryFollow(getName(), type)),
    }).then((res) => res.json());
  }
  return null;
}

/**
 * Call fetchFollow and get data.
 * Then insert value from retreived data to content and return it.
 * @returns loaded followers/following content
 */
export default function GetFollow(navigation, type) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getData() {
      const dataReceived = await fetchFollow(isMounted, type);
      setData(dataReceived);
    }
    getData();
    return () => { isMounted = false; };
  }, [type]);

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

  // create follow object by passing part of a response
  const myFollow = new Follow(data.data.user[type].nodes);

  const listFollow = [];
  for (let i = 0; i < myFollow.avatarUrls.length; i += 1) {
    listFollow.push(
      {
        avatarUrl: myFollow.avatarUrls[i],
        name: myFollow.names[i],
        username: myFollow.usernames[i],
      },
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={listFollow}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => (
          <SafeAreaView style={{
            backgroundColor: '#f3e3c2',
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginBottom: 5,
            marginTop: 5,
          }}
          >
            <Image source={{ uri: item.avatarUrl }} style={styles.image} />
            <SafeAreaView style={styles.itemWrapperStyle}>
              <Text style={styles.text}>
                Name:
                {item.name}
              </Text>
              <TouchableOpacity onPress={() => {
                setName(item.username);
                navigation.push('Profile');
              }}
              >
                <Text style={styles.touchableText}>
                  Username:
                  {item.username}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
}
