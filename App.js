import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContext from './src/Contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './src/Styles/themes';
import LoginStack from './src/Navigation/LoginStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContext.Provider value={{ theme: darkTheme }}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
