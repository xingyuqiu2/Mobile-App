/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet, Text, SafeAreaView, Dimensions, FlatList, ScrollView, TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

import GetProfile from '../controller/profileController';
import GetRepositories from '../controller/repositoriesController';
import GetFollow from '../controller/followController';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: '#3829d7',
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
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Create content for default and loaded profile screen.
 * Repos count, followers count, following count are clickable to navigate
 * to their screen.
 * @param {any} navigation
 * @returns content of profile screen
 */
export const ProfileScreen = ({ navigation }) => {
  const loadedContent = GetProfile(navigation);
  if (loadedContent !== null) {
    return loadedContent;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>
          Username: Loading
        </Text>
        <Text style={styles.text}>
          Bio: Loading
        </Text>
        <Text style={styles.text}>
          Website: Loading
        </Text>
        <Text style={styles.text}>
          Email: Loading
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Repositories')}>
          <Text style={styles.touchableText}>
            x repos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Followers')}>
          <Text style={styles.touchableText}>
            Followers: x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Following')}>
          <Text style={styles.touchableText}>
            Following: x
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Creation date: Loading
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Create content for default and loaded repositories screen.
 * @returns content of repositories screen
 */
export const RepositoriesScreen = ({ navigation }) => {
  const loadedContent = GetRepositories(navigation);
  if (loadedContent !== null) {
    return loadedContent;
  }

  const listRepos = [{
    name: 'Loading',
    user: 'Loading',
    description: 'Loading',
  }];
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
            <Text style={styles.text}>
              Repo name:
              {item.name}
            </Text>
            <Text style={styles.text}>
              Username:
              {item.user}
            </Text>
            <Text style={styles.text}>
              Description:
              {item.description}
            </Text>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
};

RepositoriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export const FollowScreen = (navigation, type) => {
  const loadedContent = GetFollow(navigation, type);
  if (loadedContent !== null) {
    return loadedContent;
  }

  const listFollow = [{
    avatarUrl: 'Loading',
    name: 'Loading',
    username: 'Loading',
  }];
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={listFollow}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.itemWrapperStyle}>
            <Text style={styles.text}>
              Name:
              {item.name}
            </Text>
            <Text style={styles.text}>
              Username:
              {item.username}
            </Text>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
};

/**
 * Create content for default and loaded following screen.
 * @returns content of following screen
 */
export const FollowingScreen = ({ navigation }) => (FollowScreen(navigation, 'following'));

FollowingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Create content for default and loaded followers screen.
 * @returns content of followers screen
 */
export const FollowersScreen = ({ navigation }) => (FollowScreen(navigation, 'followers'));

FollowersScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Main function for the app, create four navigation tab to navigate to ProfileScreen,
 * RepositoriesScreen, FollowingScreen, FollowersScreen.
 * @returns content of four tabs
 */
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Repositories" component={RepositoriesScreen} />
        <Stack.Screen name="Following" component={FollowingScreen} />
        <Stack.Screen name="Followers" component={FollowersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
