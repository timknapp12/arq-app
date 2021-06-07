import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProspectsScreen from '../components/prospectsScreen/ProspectsScreen';
import ProspectsSearchScreen from '../components/prospectsScreen/ProspectsSearchScreen';
import AppContext from '../contexts/AppContext';
import { Localized } from '../translations/Localized';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Prospects = createStackNavigator();

const ProspectsStack = () => {
  const { theme } = useContext(AppContext);
  return (
    <Prospects.Navigator
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
      <Prospects.Screen
        options={() => ({
          title: Localized('Contacts').toUpperCase(),
        })}
        name="Prospects Screen"
        component={ProspectsScreen}
      />
      <Prospects.Screen
        name="Prospects Search Screen"
        component={ProspectsSearchScreen}
        options={({ route }) => ({
          title: `${Localized('SEARCH')} ${route.params.title}`,
        })}
      />
    </Prospects.Navigator>
  );
};
export default ProspectsStack;
