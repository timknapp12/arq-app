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
  green,
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
  headerBackgroundColor: blue,
  tertiarySelected: green,
  statusBar: 'dark',
};

export const darkTheme = {
  color: white,
  invertedColor: black,
  backgroundColor: black,
  activeBackground: blue,
  inactiveBackground: darkgray,
  activeTint: white,
  inactiveTint: white,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: darkblue,
  error: red,
  headerBackgroundColor: blue,
  tertiarySelected: green,
  statusBar: 'light',
};
