import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppContext from './src/Contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './src/Styles/themes';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContext.Provider value={{ theme: darkTheme }}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
