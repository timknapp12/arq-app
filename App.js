import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import AppContext from './src/Contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './src/Styles/themes';
import LoginStack from './src/Navigation/LoginStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ theme, setTheme }}>
        <StatusBar
          backgroundColor={theme.backgroundColor}
          barStyle={theme.statusBar}
        />
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
