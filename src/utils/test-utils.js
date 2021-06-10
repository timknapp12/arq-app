import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react-native';
import AppContext from '../contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from '../styles/themes';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

// source for set up of config: https://testing-library.com/docs/react-native-testing-library/setup
jest.mock('@react-navigation/native');
// const myFunc = jest.fn();
const AllTheProviders = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <AppContext.Provider value={{ theme: darkTheme }}>
          {children}
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

AllTheProviders.propTypes = {
  children: PropTypes.node,
};
// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
