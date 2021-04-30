import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResourcesScreen from '../components/resourcesScreen/ResourcesScreen';
import ResourcesCategoryScreen from '../components/resourcesScreen/ResourcesCategoryScreen';
import ProductCategoryScreen from '../components/resourcesScreen/ProductCategoryScreen';
import AppContext from '../contexts/AppContext';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Resources = createStackNavigator();

const ResourcesStack = () => {
  const { theme } = useContext(AppContext);
  return (
    <Resources.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.primaryTextColor,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          opacity: 0.83,
          fontFamily: 'Avenir-Light',
          letterSpacing: 1.43,
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
        name="Product Category Screen"
        component={ProductCategoryScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Resources.Navigator>
  );
};
export default ResourcesStack;
