import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeStack from './HomeStack';
import NewsScreen from '../components/NewsScreen';
import ResourcesScreen from '../components/ResourcesScreen';
import AppContext from '../Contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';
import business from '../../assets/icons/business.png';
import resources from '../../assets/icons/resources.png';
import news from '../../assets/icons/news.png';
import { Localized, init } from '../Translations/Localized';

// source for navigation analytics: https://docs.expo.io/versions/latest/sdk/firebase-analytics/
const getActiveRouteName = (navigationState) => {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
};

// source for tab navigation: https://reactnavigation.org/docs/tab-based-navigation
const Tab = createBottomTabNavigator();

const Tabs = () => {
  init();
  const { theme } = useContext(AppContext);
  return (
    <Tab.Navigator
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
          // Update Firebase with the name of your screen
          Analytics.setCurrentScreen(currentScreen);
        }
      }}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: () => {
          let source;
          if (route.name === 'HomeScreen') {
            source = business;
          } else if (route.name === 'ResourcesScreen') {
            source = resources;
          } else if (route.name === 'NewsScreen') {
            source = news;
          }
          return <Image source={source} style={{ width: 20, height: 20 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.activeTint,
        inactiveTintColor: theme.inactiveTint,
        activeBackgroundColor: theme.activeBackground,
        inactiveBackgroundColor: theme.inactiveBackground,
        safeAreaInsets: {
          bottom: 0,
        },
        tabStyle: {
          paddingBottom: 20,
          paddingTop: 8,
        },
        style: { height: 70 },
        labelStyle: {
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{ title: Localized('business') }}
      />
      <Tab.Screen
        name="ResourcesScreen"
        component={ResourcesScreen}
        options={{ title: Localized('resources') }}
      />
      <Tab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ title: Localized('news') }}
      />
    </Tab.Navigator>
  );
};

Tabs.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
  size: PropTypes.number,
};

export default Tabs;
