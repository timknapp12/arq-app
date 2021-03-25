import {
  white,
  black,
  darkgray,
  gray,
  lightgray,
  blue,
  darkblue,
  red,
  veryLightGray,
  lightblue,
  transparentGray,
} from './colors';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
export const lightTheme = {
  color: black,
  invertedColor: white,
  secondaryTextColor: gray,
  backgroundColor: white,
  activeBackground: darkgray,
  inactiveBackground: veryLightGray,
  activeTint: white,
  inactiveTint: blue,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: darkblue,
  error: red,
  headerBackgroundColor: blue,
  tertiarySelectedTextColor: blue,
  tertiarySelectedBackgroundColor: white,
  tertiaryDisabledTextColor: blue,
  tertiaryDisabledBackgroundColor: lightblue,
  modalBackgroundColor: transparentGray,
  activeSwitchBackground: '#006699',
  inactiveSwitchBackground: darkgray,
  activeSwitchThumb: '#8DB600',
  inactiveSwitchThumb: gray,
  statusBar: 'dark',
};

export const darkTheme = {
  color: white,
  invertedColor: black,
  secondaryTextColor: gray,
  backgroundColor: black,
  activeBackground: blue,
  inactiveBackground: darkgray,
  activeTint: white,
  inactiveTint: white,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: darkblue,
  error: red,
  headerBackgroundColor: black,
  tertiarySelectedTextColor: white,
  tertiarySelectedBackgroundColor: blue,
  tertiaryDisabledTextColor: veryLightGray,
  tertiaryDisabledBackgroundColor: lightblue,
  modalBackgroundColor: transparentGray,
  activeSwitchBackground: blue,
  inactiveSwitchBackground: darkgray,
  activeSwitchThumb: '#8DB600',
  inactiveSwitchThumb: gray,
  statusBar: 'light',
};
