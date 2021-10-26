import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeamScreen from '../components/teamScreen/TeamScreen';
import SearchDownlineScreen from '../components/teamScreen/myTeam/SearchDownlineScreen';
import AppContext from '../contexts/AppContext';

const Team = createStackNavigator();

const TeamStack = () => {
  const { theme } = React.useContext(AppContext);

  return (
    <Team.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.primaryTextColor,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Avenir-Light',
          letterSpacing: 1.43,
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
      <Team.Screen
        name="Search Downline Screen"
        component={SearchDownlineScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Team.Navigator>
  );
};

export default TeamStack;
