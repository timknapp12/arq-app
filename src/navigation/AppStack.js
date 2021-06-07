import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserInactivity from 'react-native-user-inactivity';
import Tabs from './Tabs';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';
import AppContext from '../contexts/AppContext';
import ProspectsStack from './ProspectsStack';
import { signOutOfFirebase } from '../utils/firebase/login';

const App = createStackNavigator();

const AppStack = () => {
  const {
    theme,
    storeTimeStamp,
    setIsSignedInToApp,
    keepLoggedIn,
  } = useContext(AppContext);
  const [isUserActive, setIsUserActive] = useState(true);

  const [timer] = useState(1000 * 60 * 20);

  const onUserActivity = (isActive) => {
    if (isActive) {
      setIsUserActive(true);
    } else {
      storeTimeStamp();
      setIsUserActive(false);
      // if user elects to stay signed in, then we only lock them out of the app after inactivity, and then they can get in with face or touch id
      setIsSignedInToApp(false);
      !keepLoggedIn && signOutOfFirebase();
    }
  };
  return (
    <UserInactivity
      isActive={isUserActive}
      timeForInactivity={timer}
      onAction={(isActive) => {
        onUserActivity(isActive);
      }}>
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
      </App.Navigator>
    </UserInactivity>
  );
};
export default AppStack;
