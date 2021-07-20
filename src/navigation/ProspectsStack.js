import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProspectsScreenContainer from '../components/prospectsScreen/ProspectsScreenContainer';
import ProspectsScreen from '../components/prospectsScreen/ProspectsScreen';
import ProspectsSearchScreen from '../components/prospectsScreen/ProspectsSearchScreen';
import AppContext from '../contexts/AppContext';
import { Localized } from '../translations/Localized';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Prospects = createStackNavigator();

const ProspectsStack = () => {
  const { theme } = useContext(AppContext);
  return (
    <ProspectsScreenContainer>
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
            title: Localized('Prospects').toUpperCase(),
          })}
          name="Prospects Screen"
          component={ProspectsScreen}
        />
        <Prospects.Screen
          name="Prospects Search Screen"
          component={ProspectsSearchScreen}
          options={() => ({
            title: `${Localized('Search').toUpperCase()} ${Localized(
              'Prospects',
            ).toUpperCase()}`,
          })}
        />
      </Prospects.Navigator>
    </ProspectsScreenContainer>
  );
};
export default ProspectsStack;
