import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, View } from 'react-native';
import AppContext from './src/contexts/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import fetch from 'cross-fetch';
import { darkTheme } from './src/styles/themes';
import LoginStack from './src/navigation/LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { initLanguage } from './src/translations/Localized';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ApolloProvider } from '@apollo/client';
// this allows apollo refetch queries to happen from apollo
import 'core-js/features/promise';

const firebaseConfig = Constants.expoConfig.web.config.firebase;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

LogBox.ignoreLogs([
  'Setting a timer',
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed from React Native',
  'AsyncStorage has been extracted from react-native',
  'EventEmitter.removeListener',
]);
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [associateId, setAssociateId] = useState(null);
  const [legacyId, setLegacyId] = useState(null);
  const [deviceLanguage, setDeviceLanguage] = useState('en');
  const [token, setToken] = useState('');
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Avenir-Light': require('./assets/fonts/avenir/AvenirLTStd-Light.otf'),
    'Avenir-Book': require('./assets/fonts/avenir/AvenirLTStd-Book.otf'),
    'Avenir-Heavy': require('./assets/fonts/avenir/AvenirLTStd-Heavy.otf'),
    'Avenir-Black': require('./assets/fonts/avenir/AvenirLTStd-Black.otf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const signOutOfFirebase = () => {
    try {
      setToken('');
      firebase.auth().signOut();
    } catch (err) {
      console.log(`err`, err.message);
    }
  };

  const getLanguageCode = async () => {
    const lang = await initLanguage();
    setDeviceLanguage(lang);
  };
  getLanguageCode();

  // advanced http for apollo client https://www.apollographql.com/docs/react/networking/advanced-http-networking/#overriding-options
  const httpLink = new HttpLink({
    uri: Constants.expoConfig.extra.uri,
    fetch,
  });

  const wsLink = new WebSocketLink({
    uri: Constants.expoConfig.extra.uri,
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
        Query: {
          fields: {
            searchTree: {
              ...relayStylePagination(),
              // Handles incoming data
              keyArgs: false,
              merge(
                existing = {
                  /*some default object fields*/
                },
                incoming,
                { args },
              ) {
                if (args && !args.after) {
                  // Initial fetch or refetch
                  return incoming;
                }
                // Pagination
                return {
                  ...existing,
                  pageInfo: incoming.pageInfo,
                  nodes: [...existing.nodes, ...incoming.nodes],
                };
              },
            },
          },
        },
      },
    }),
    link: concat(authMiddleware, splitLink),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
            }}
          >
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <StatusBar
                backgroundColor={theme.backgroundColor}
                style={theme.statusBar}
              />
              <NavigationContainer>
                <LoginStack />
              </NavigationContainer>
            </View>
          </AppContext.Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

export default App;
