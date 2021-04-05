import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResourcesScreen from '../components/resourcesScreen/index';
import ResourcesCategoryScreen from '../components/resourcesScreen/ResourcesCategoryScreen';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';
import { white, blue } from '../styles/colors';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Resources = createStackNavigator();

const ResourcesStack = () => {
  return (
    <Resources.Navigator
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
      <Resources.Screen
        name="Resources Screen"
        component={ResourcesScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Resources.Screen
        name="Resources Category Screen"
        component={ResourcesCategoryScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Resources.Screen
        name="Resources Asset Screen"
        component={ResourcesAssetScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Resources.Navigator>
  );
};
export default ResourcesStack;
