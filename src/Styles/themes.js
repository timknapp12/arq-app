import {
  white,
  black,
  offwhite,
  darkgray,
  gray,
  lightgray,
  blue,
  darkblue,
  red,
} from './colors';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
export const lightTheme = {
  color: black,
  invertedColor: white,
  backgroundColor: white,
  activeBackground: darkgray,
  inactiveBackground: offwhite,
  activeTint: white,
  inactiveTint: blue,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: darkblue,
  error: red,
  statusBar: 'dark',
};

export const darkTheme = {
  color: white,
  invertedColor: black,
  backgroundColor: black,
  activeBackground: offwhite,
  inactiveBackground: darkgray,
  activeTint: blue,
  inactiveTint: white,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: darkblue,
  error: red,
  statusBar: 'light',
};
