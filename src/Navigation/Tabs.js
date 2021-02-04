import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// TODO replace IonIcons with real icons
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import FeedScreen from '../Components/FeedScreen';
import AppContext from '../Contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';

const getActiveRouteName = (navigationState) => {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FeedScreen') {
            iconName = focused ? 'message-text' : 'message-text-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
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
          paddingTop: 4,
        },
        style: { height: 60 },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{ title: 'Home', tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{ title: 'Feed' }}
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
