import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react-native';
import AppContext from '../Contexts/AppContext';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from '../Styles/themes';

const setIsSignedIn = jest.fn();

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContext.Provider value={{ theme: darkTheme, setIsSignedIn }}>
        {children}
      </AppContext.Provider>
    </ThemeProvider>
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
