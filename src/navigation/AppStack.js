import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';

const App = createStackNavigator();

const AppStack = () => {
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
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            opacity: 0.83,
            fontFamily: 'Avenir-Light',
            letterSpacing: 1.43,
          },
        })}
        name="Resources Asset Screen"
        component={ResourcesAssetScreen}
        // options={({ route }) => ({ title: route.params.title })}
      />
    </App.Navigator>
  );
};
export default AppStack;
