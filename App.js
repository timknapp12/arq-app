import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContext from './src/contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
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
import { client } from './src/graphql/client';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Avenir-Light': require('./assets/fonts/avenir/AvenirLTStd-Light.otf'),
    'Avenir-Book': require('./assets/fonts/avenir/AvenirLTStd-Book.otf'),
    'Avenir-Heavy': require('./assets/fonts/avenir/AvenirLTStd-Heavy.otf'),
    'Avenir-Black': require('./assets/fonts/avenir/AvenirLTStd-Black.otf'),
    Helvetica: require('./assets/fonts/helvetica/Helvetica.ttf'),
  });
  const [corporateResources, setCorporateResources] = useState([]);
  const [deviceLanguage, setDeviceLanguage] = useState('en');
  const [userMarket, setUserMarket] = useState('us');

  useEffect(() => {
    setDeviceLanguage(initLanguage());
  }, [initLanguage]);

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
            isSignedIn,
            setIsSignedIn,
            user,
            setUser,
            useBiometrics,
            setUseBiometrics,
            corporateResources,
            setCorporateResources,
            deviceLanguage,
            userMarket,
            setUserMarket,
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
