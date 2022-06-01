import React, { useContext } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';
import AppContext from '../contexts/AppContext';
import ProspectsStack from './ProspectsStack';
import EnrollmentScreen from '../components/enrollment/EnrollmentScreen';
import NotificationsScreen from '../components/notifications/NotificationsScreen';
import { Localized } from '../translations/Localized';
import { CloseIcon } from '../components/common';

const App = createStackNavigator();

const AppStack = () => {
  const { theme } = useContext(AppContext);

  return (
    <App.Navigator>
      <App.Screen
        name="Tabs"
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
      <App.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="Prospects Stack"
        component={ProspectsStack}
      />
      <App.Screen
        options={() => ({
          title: Localized('Enrollment').toUpperCase(),
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerBackImage: () => (
            <View style={{ marginStart: 8 }}>
              <CloseIcon />
            </View>
          ),
          headerTintColor: theme.primaryTextColor,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Avenir-Light',
            letterSpacing: 1.43,
          },
        })}
        name="Enrollment Screen"
        component={EnrollmentScreen}
      />
      <App.Screen
        options={{
          headerShown: false,
        }}
        name="Notifications Screen"
        component={NotificationsScreen}
      />
    </App.Navigator>
  );
};
export default AppStack;
