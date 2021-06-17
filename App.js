import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContext from './src/contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import fetch from 'cross-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme } from './src/styles/themes';
import LoginStack from './src/navigation/LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseConfig from './firebase.config';
import * as firebase from 'firebase';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { initLanguage } from './src/translations/Localized';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ApolloProvider } from '@apollo/client';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [user, setUser] = useState(null);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Avenir-Light': require('./assets/fonts/avenir/AvenirLTStd-Light.otf'),
    'Avenir-Book': require('./assets/fonts/avenir/AvenirLTStd-Book.otf'),
    'Avenir-Heavy': require('./assets/fonts/avenir/AvenirLTStd-Heavy.otf'),
    'Avenir-Black': require('./assets/fonts/avenir/AvenirLTStd-Black.otf'),
  });
  const [corporateResources, setCorporateResources] = useState([]);
  const [deviceLanguage, setDeviceLanguage] = useState('en');
  const [userMarket, setUserMarket] = useState('us');
  const [token, setToken] = useState('');
  console.log(`token`, token);

  useEffect(() => {
    setDeviceLanguage(initLanguage());
  }, [initLanguage]);

  const storeBiometrics = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@biometrics', jsonValue);
      return setUseBiometrics(value);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getBiometrics = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@biometrics');
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      // if there is nothing saved in storage then set to false
      return setUseBiometrics(parsedValue ? parsedValue : false);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  // advanced http for apollo client https://www.apollographql.com/docs/react/networking/advanced-http-networking/#overriding-options
  const httpLink = new HttpLink({
    uri: 'https://qservicesstagingapp.azurewebsites.net/graphql',
    fetch,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));
    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

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
            user,
            setUser,
            useBiometrics,
            storeBiometrics,
            getBiometrics,
            corporateResources,
            setCorporateResources,
            deviceLanguage,
            userMarket,
            setUserMarket,
            token,
            setToken,
          }}>
          <StatusBar
            backgroundColor={theme.backgroundColor}
            style={theme.statusBar}
          />
          <NavigationContainer>
            <LoginStack />
          </NavigationContainer>
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
