import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContext from './src/contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './src/styles/themes';
import LoginStack from './src/navigation/LoginStack';
import Tabs from './src/navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import firebaseConfig from './firebase.config';
import * as firebase from 'firebase';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphql/client';
import UserInactivity from 'react-native-user-inactivity';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Avenir-Light': require('./assets/fonts/avenir/AvenirLTStd-Light.otf'),
    'Avenir-Book': require('./assets/fonts/avenir/AvenirLTStd-Book.otf'),
    'Avenir-Heavy': require('./assets/fonts/avenir/AvenirLTStd-Heavy.otf'),
  });

  const [isUserActive, setIsUserActive] = useState(true);
  const [timer] = useState(1000 * 60 * 20);

  const storeTimeStamp = async () => {
    let value = new Date().getTime();
    try {
      await AsyncStorage.setItem('@stored_timeStamp', JSON.stringify(value));
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getTimeStamp = async () => {
    try {
      const value = await AsyncStorage.getItem('@stored_timeStamp');
      const jsonValue = JSON.parse(value);
      if (jsonValue !== null) {
        return jsonValue;
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const onUserActivity = (isActive) => {
    if (isActive) {
      setIsUserActive(true);
    } else {
      storeTimeStamp();
      setIsUserActive(false);
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    const newTimeStamp = new Date().getTime();
    getTimeStamp().then((res) => {
      const value = newTimeStamp - res;
      const minutes = value / 60 / 1000;
      if (minutes < 20) {
        setIsSignedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            theme,
            setTheme,
            setIsSignedIn,
            user,
            setUser,
            useBiometrics,
            setUseBiometrics,
            storeTimeStamp,
          }}>
          <StatusBar
            backgroundColor={theme.backgroundColor}
            style={theme.statusBar}
          />

          <NavigationContainer>
            {isSignedIn ? (
              <UserInactivity
                isActive={isUserActive}
                timeForInactivity={timer}
                onAction={(isActive) => {
                  onUserActivity(isActive);
                }}>
                <Tabs />
              </UserInactivity>
            ) : (
              <LoginStack />
            )}
          </NavigationContainer>
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
