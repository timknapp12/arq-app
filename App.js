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
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from 'cross-fetch';
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
// this allows apollo refetch queries to happen from apollo
import 'core-js/features/promise';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [associateId, setAssociateId] = useState(null);
  const [legacyId, setLegacyId] = useState(null);

  // if user has been rank of Ruby or higher they have permissions to create team content
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Avenir-Light': require('./assets/fonts/avenir/AvenirLTStd-Light.otf'),
    'Avenir-Book': require('./assets/fonts/avenir/AvenirLTStd-Book.otf'),
    'Avenir-Heavy': require('./assets/fonts/avenir/AvenirLTStd-Heavy.otf'),
    'Avenir-Black': require('./assets/fonts/avenir/AvenirLTStd-Black.otf'),
  });
  const [deviceLanguage, setDeviceLanguage] = useState('en');
  const [token, setToken] = useState('');

  const signOutOfFirebase = () => {
    try {
      setToken('');
      firebase.auth().signOut();
    } catch (err) {
      console.log(`err`, err.message);
    }
  };

  useEffect(() => {
    setDeviceLanguage(initLanguage());
  }, [initLanguage]);

  // advanced http for apollo client https://www.apollographql.com/docs/react/networking/advanced-http-networking/#overriding-options
  // const uri = 'https://qservicesapi.azurewebsites.net/graphql'
  const uri = 'https://qservicesapi-staging.azurewebsites.net/graphql';
  // const uri = 'https://qservicesapi-dev.azurewebsites.net/graphql';

  const httpLink = new HttpLink({
    uri: uri,
    fetch,
  });

  const wsLink = new WebSocketLink({
    uri: uri,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

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
    cache: new InMemoryCache({
      typePolicies: {
        Folders: { keyFields: ['folderId'] },
        Links: { keyFields: ['linkId'] },
        Associate: { keyFields: ['associateId'] },
        Prospect: { keyFields: ['prospectId'] },
      },
    }),
    link: concat(authMiddleware, splitLink),
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
            associateId,
            setAssociateId,
            legacyId,
            setLegacyId,
            deviceLanguage,
            token,
            setToken,
            signOutOfFirebase,
            hasPermissions,
            setHasPermissions,
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
