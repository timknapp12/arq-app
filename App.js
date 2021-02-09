import React, { useState } from 'react';
import { StatusBar } from 'react-native';
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
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ theme, setTheme, setIsSignedIn }}>
        <StatusBar
          backgroundColor={theme.backgroundColor}
          barStyle={theme.statusBar}
        />
        <NavigationContainer>
          {isSignedIn ? <Tabs /> : <LoginStack />}
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
