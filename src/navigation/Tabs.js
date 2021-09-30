import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, Animated, Dimensions, Easing } from 'react-native';
import { TabBarButton } from '../components/common';
import DashboardStack from './DashboardStack';
import ResourcesStack from './ResourcesStack';
import TeamStack from './TeamStack';
import NewsScreen from '../components/newsScreen/NewsScreen';
import AppContext from '../contexts/AppContext';
import LoginContext from '../contexts/LoginContext';
import * as Analytics from 'expo-firebase-analytics';
import storybook from '../../assets/icons/storybook.png';
import { Localized } from '../translations/Localized';
import StorybookUI from '../../storybook';
import AddContactModal from '../components/prospectsScreen/AddContactModal';
import {
  ResourcesIcon,
  DashboardIcon,
  TeamIcon,
  NewsIcon,
} from '../components/common';

// source for navigation analytics: https://docs.expo.io/versions/latest/sdk/firebase-analytics/
const getActiveRouteName = (navigationState) => {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
};

const { width: screenWidth } = Dimensions.get('screen');
const duration = 250;

// source for tab navigation: https://reactnavigation.org/docs/tab-based-navigation
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme, hasPermissionsToWrite } = useContext(AppContext);
  const { newsNotificationCount } = useContext(LoginContext);

  const [showStorybook] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  // options and animations for the add button in center of navbar
  const [showAddOptions, setShowAddOptions] = useState(false);

  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const rowWidthAnim = useRef(new Animated.Value(120)).current;
  const rowTopAnim = useRef(new Animated.Value(0)).current;
  // source for roateAnim https://javascript.plainenglish.io/creating-a-rotation-animation-in-react-native-45c3f2973d62
  const [rotateAnim] = useState(new Animated.Value(0));

  const openAddOptions = () => {
    setShowAddOptions(true);
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: screenWidth / 2,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: -46,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeAddOptions = () => {
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: 120,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddOptions(false));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
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
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                showAddOptions={showAddOptions}
                buttonScaleAnim={buttonScaleAnim}
                rowWidthAnim={rowWidthAnim}
                rowTopAnim={rowTopAnim}
                spin={spin}
                onPress={() =>
                  !hasPermissionsToWrite
                    ? setIsAddContactModalOpen(true)
                    : showAddOptions
                    ? closeAddOptions()
                    : openAddOptions()
                }
              />
            ),
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
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          newContact={true}
        />
      )}
    </>
  );
};

Tabs.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
  size: PropTypes.number,
};

export default Tabs;
