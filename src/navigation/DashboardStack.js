import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../components/dashboardScreen/DashboardScreen';
import { white, blue } from '../styles/colors';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Dashboard = createStackNavigator();

const DashboardStack = () => {
  return (
    <Dashboard.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: blue },
        headerTintColor: white,
        headerTitleStyle: {
          fontSize: 24,
          opacity: 0.83,
          fontFamily: 'Avenir-Light',
        },
      }}>
      <Dashboard.Screen
        name="Dashboard Screen"
        component={DashboardScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Dashboard.Navigator>
  );
};
export default DashboardStack;
