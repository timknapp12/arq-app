import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContext from './src/Contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './src/Styles/themes';
import LoginStack from './src/Navigation/LoginStack';
import Tabs from './src/Navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import firebaseConfig from './firebase.config';
import * as firebase from 'firebase';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

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
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Nunito-Black': require('./assets/fonts/Nunito/Nunito-Black.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ theme, setTheme, setIsSignedIn }}>
        <StatusBar
          backgroundColor={theme.backgroundColor}
          style={theme.statusBar}
        />
        <NavigationContainer>
          {isSignedIn ? <Tabs /> : <LoginStack />}
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
