import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import DashboardStack from './DashboardStack';
import ResourcesStack from './ResourcesStack';
import NewsScreen from '../components/newsScreen/NewsScreen';
import AppContext from '../contexts/AppContext';
import LoginContext from '../contexts/LoginContext';
import * as Analytics from 'expo-firebase-analytics';
import storybook from '../../assets/icons/storybook.png';
import { Localized } from '../translations/Localized';
import StorybookUI from '../../storybook';
import { ResourcesIcon, DashboardIcon, NewsIcon } from '../components/common';

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
  const { theme } = useContext(AppContext);
  const { newsNotificationCount } = useContext(LoginContext);
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
        tabBarIcon: ({ color }) => {
          let source;
          if (route.name === 'DashboardScreen') {
            return <DashboardIcon fill={color} />;
          } else if (route.name === 'ResourcesStack') {
            return <ResourcesIcon fill={color} />;
          } else if (route.name === 'NewsScreen') {
            return <NewsIcon fill={color} />;
          } else if (route.name === 'Storybook') {
            source = storybook;
            return <Image source={source} style={{ height: 24 }} />;
          }
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
        style: { height: 70, borderTopWidth: 0 },
        labelStyle: {
          fontFamily: 'Avenir-Light',
          fontSize: 12,
          opacity: 0.83,
        },
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardStack}
        options={{ title: Localized('Dashboard').toUpperCase() }}
      />
      <Tab.Screen
        name="ResourcesStack"
        component={ResourcesStack}
        options={{ title: Localized('Resources').toUpperCase() }}
      />
      <Tab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          title: Localized('News').toUpperCase(),
          tabBarBadge: newsNotificationCount > 0 ? newsNotificationCount : null,
          tabBarBadgeStyle: { backgroundColor: theme.highlight },
        }}
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
