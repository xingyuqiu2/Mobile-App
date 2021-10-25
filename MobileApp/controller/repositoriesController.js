/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import 'node-fetch';
import Repository from '../model/repository';
import {
  getName, setName, BASE_URL, HEADERS, queryRe,
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
  repoName: {
    color: '#8e1912',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 6,
  },
  touchableText: {
    color: '#711674',
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
});

/**
 * Fetch repositories data using graphQL query.
 * @param {boolean} isMounted
 * @returns response from fetch
 */
export async function fetchRepositories(isMounted) {
  if (isMounted) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(queryRe(getName())),
    }).then((res) => res.json());
  }
  return null;
}

/**
 * Call fetchRepositories and get data.
 * Then insert value from retreived data to content and return it.
 * @returns loaded repository content
 */
export default function GetRepositories(navigation) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getData() {
      const dataReceived = await fetchRepositories(isMounted);
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

  // create repository object by passing part of a response
  const myRepositories = new Repository(data.data.user.repositories.nodes);

  const listRepos = [];
  for (let i = 0; i < myRepositories.repoNames.length; i += 1) {
    listRepos.push(
      {
        name: myRepositories.repoNames[i],
        user: myRepositories.users[i],
        description: myRepositories.descriptions[i],
      },
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={listRepos}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.itemWrapperStyle}>
            <Text style={styles.repoName}>
              Repo name:
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => {
              setName(item.user);
              navigation.push('Profile');
            }}
            >
              <Text style={styles.touchableText}>
                Username:
                {item.user}
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Description:
              {item.description}
            </Text>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
}
