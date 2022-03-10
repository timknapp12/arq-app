import React, { useContext, useRef, useEffect } from 'react';
import { View, PanResponder, LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Tabs from './Tabs';
import ResourcesAssetScreen from '../components/resourcesScreen/ResourcesAssetScreen';
import AppContext from '../contexts/AppContext';
import LoginContext from '../contexts/LoginContext';
import ProspectsStack from './ProspectsStack';
import EnrollmentScreen from '../components/enrollment/EnrollmentScreen';
import { getToken } from '../utils/firebase/login';
import { Localized } from '../translations/Localized';
import { CloseIcon } from '../components/common';

const App = createStackNavigator();

const AppStack = () => {
  const { theme, setToken } = useContext(AppContext);
  const { setIsFirstAppLoad } = useContext(LoginContext);

  const navigation = useNavigation();
  const signOut = async () => {
    await getToken(setToken);
    await setIsFirstAppLoad(true);
    navigation.navigate('Login Screen', { resetLogin: true });
  };

  const timerId = useRef(false);

  const timeForInactivityInSecond = 20 * 60 * 1000;

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      signOut();
    }, timeForInactivityInSecond);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      },
    }),
  ).current;

  useEffect(() => {
    resetInactivityTimeout();
  }, []);
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
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
      </App.Navigator>
    </View>
  );
};
export default AppStack;
