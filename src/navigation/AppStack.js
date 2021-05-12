import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';
import AppContext from '../contexts/AppContext';

const App = createStackNavigator();

const AppStack = () => {
  const { theme } = useContext(AppContext);
  return (
    <App.Navigator>
      <App.Screen
        name="App Screen"
        component={Tabs}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <App.Screen
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTintColor: theme.primaryTextColor,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Avenir-Light',
            letterSpacing: 1.43,
          },
        })}
        name="Resources Asset Screen"
        component={ResourcesAssetScreen}
      />
    </App.Navigator>
  );
};
export default AppStack;
