import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeamScreen from '../components/teamScreen/TeamScreen';
import { white, blue } from '../styles/colors';

const Team = createStackNavigator();

const TeamStack = () => {
  return (
    <Team.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: blue },
        headerTintColor: white,
        headerTitleStyle: {
          fontSize: 24,
          opacity: 0.83,
          fontFamily: 'Avenir-Light',
        },
      }}
    >
      <Team.Screen
        name="Team Screen"
        component={TeamScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Team.Navigator>
  );
};

export default TeamStack;
