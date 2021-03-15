import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import DashboardStack from './DashboardStack';
import NewsScreen from '../components/NewsScreen';
import ResourcesScreen from '../components/ResourcesScreen';
import AppContext from '../Contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';
import dashboard from '../../assets/icons/ic_dashboard.png';
import resources from '../../assets/icons/resources.png';
import news from '../../assets/icons/news.png';
import storybook from '../../assets/icons/storybook.png';
import { Localized, init } from '../Translations/Localized';
import StorybookUI from '../../storybook/';

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
  const [showStorybook] = useState(true);
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
          if (route.name === 'DashboardScreen') {
            source = dashboard;
          } else if (route.name === 'ResourcesScreen') {
            source = resources;
          } else if (route.name === 'NewsScreen') {
            source = news;
          } else if (route.name === 'Storybook') {
            source = storybook;
          }
          return <Image source={source} style={{ height: 24 }} />;
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
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
        },
        style: { height: 70 },
        labelStyle: {
          fontFamily: 'Nunito-Light',
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardStack}
        options={{ title: Localized('DASHBOARD') }}
      />
      <Tab.Screen
        name="ResourcesScreen"
        component={ResourcesScreen}
        options={{ title: Localized('RESOURCES') }}
      />
      <Tab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ title: Localized('NEWS') }}
      />
      {/* eslint-disable-next-line no-undef */}
      {__DEV__ && showStorybook && (
        <Tab.Screen name="Storybook" component={StorybookUI} />
      )}
    </Tab.Navigator>
  );
};

Tabs.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
  size: PropTypes.number,
};

export default Tabs;
