import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import TabButtonDataContainer from './TabButtonDataContainer';
import DashboardStack from './DashboardStack';
import ResourcesStack from './ResourcesStack';
import TeamStack from './TeamStack';
import NewsScreen from '../components/newsScreen/NewsScreen';
import AppContext from '../contexts/AppContext';
import LoginContext from '../contexts/LoginContext';
import storybook from '../../assets/icons/storybook.png';
import { Localized } from '../translations/Localized';
import StorybookUI from '../../storybook';
import {
  ResourcesIcon,
  DashboardIcon,
  TeamIcon,
  NewsIcon,
  TabBarButton,
} from '../components/common';

// source for tab navigation: https://reactnavigation.org/docs/tab-based-navigation
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useContext(AppContext);
  const { newsNotificationCount } = useContext(LoginContext);

  const [showStorybook] = useState(false);

  return (
    <TabButtonDataContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color }) => {
            let source;
            if (route.name === 'DashboardScreen') {
              return <DashboardIcon fill={color} />;
            } else if (route.name === 'ResourcesStack') {
              return <ResourcesIcon fill={color} />;
            } else if (route.name === 'TeamStack') {
              return <TeamIcon fill={color} />;
            } else if (route.name === 'NewsScreen') {
              return <NewsIcon fill={color} />;
            } else if (route.name === 'Storybook') {
              source = storybook;
              return <Image source={source} style={{ height: 24 }} />;
            }
          },
          headerShown: false,
          tabBarActiveTintColor: theme.activeTint,
          tabBarInactiveTintColor: theme.inactiveTint,
          tabBarActiveBackgroundColor: theme.activeBackground,
          tabBarInactiveBackgroundColor: theme.inactiveBackground,
          tabBarStyle: {
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            paddingTop: 8,
            height: 70,
            borderTopWidth: 0,
            backgroundColor: theme.activeBackground,
            zIndex: 1,
          },
          tabBarLabelStyle: {
            fontFamily: 'Avenir-Light',
            fontSize: 12,
            opacity: 0.83,
          },
        })}
        backBehavior="history" // default is first route
      >
        <Tab.Screen
          name="DashboardScreen"
          component={DashboardStack}
          options={{ title: Localized('Dashboard').toUpperCase() }}
        />
        <Tab.Screen
          name="TeamStack"
          component={TeamStack}
          options={{
            title: Localized('Team').toUpperCase(),
            tabBarItemStyle: {
              marginEnd: 24,
              zIndex: -1,
            },
          }}
        />
        <Tab.Screen
          name="add button"
          component={''}
          options={{
            tabBarButton: (props) => <TabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="ResourcesStack"
          component={ResourcesStack}
          options={{
            title: Localized('Resources').toUpperCase(),
            tabBarItemStyle: {
              marginStart: 24,
              zIndex: -1,
            },
          }}
        />
        <Tab.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{
            title: Localized('News').toUpperCase(),
            tabBarBadge:
              newsNotificationCount > 0 ? newsNotificationCount : null,
            tabBarBadgeStyle: { backgroundColor: theme.highlight },
          }}
        />
        {/* eslint-disable-next-line no-undef */}
        {__DEV__ && showStorybook && (
          <Tab.Screen name="Storybook" component={StorybookUI} />
        )}
      </Tab.Navigator>
    </TabButtonDataContainer>
  );
};

Tabs.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
  size: PropTypes.number,
};

export default Tabs;
