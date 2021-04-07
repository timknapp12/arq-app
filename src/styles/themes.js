import {
  white,
  black,
  nero,
  darkgray,
  gray,
  lightgray,
  blue,
  red,
  transparentGray,
} from './colors';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
export const lightTheme = {
  color: black,
  invertedColor: white,
  secondaryTextColor: gray,
  backgroundColor: white,
  activeBackground: darkgray,
  inactiveBackground: lightgray,
  activeTint: white,
  inactiveTint: blue,
  primaryButtonBackgroundColor: blue,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: blue,
  error: red,
  headerBackgroundColor: blue,
  subheaderBackgroundColor: darkgray,
  tertiarySelectedTextColor: blue,
  tertiaryDisabledTextColor: blue,
  tertiarySelectedBackgroundColor: white,
  tertiaryDisabledBackgroundColor: blue,
  teriarySelectedBorderColor: 'rgba(255,255,255,.83)',
  tertiaryDisabledBorderColor: 'rgba(255,255,255,.5)',
  primaryOpacity: 0.83,
  secondaryOpacity: 0.6,
  disabledOpacity: 0.5,
  modalBackgroundColor: transparentGray,
  activeSwitchBackground: '#006699',
  inactiveSwitchBackground: darkgray,
  activeSwitchThumb: '#8DB600',
  inactiveSwitchThumb: gray,
  sideMenuBackground: nero,
  topButtonBarBackground: nero,
  sliderTrackColor: darkgray,
  sliderThumbColor: blue,
  cardBackgroundColor: darkgray,
  statusBar: 'dark',
};

export const darkTheme = {
  color: white,
  invertedColor: black,
  secondaryTextColor: gray,
  backgroundColor: black,
  activeBackground: nero,
  inactiveBackground: nero,
  activeTint: 'rgba(255,255,255,.83)',
  inactiveTint: 'rgba(255,255,255,.35)',
  primaryButtonBackgroundColor: blue,
  disabledBackgroundColor: lightgray,
  disabledTextColor: gray,
  highlight: blue,
  error: red,
  headerBackgroundColor: black,
  subheaderBackgroundColor: darkgray,
  tertiarySelectedTextColor: white,
  tertiaryDisabledTextColor: white,
  tertiarySelectedBackgroundColor: 'transparent',
  tertiaryDisabledBackgroundColor: 'transparent',
  teriarySelectedBorderColor: 'rgba(255,255,255,.83)',
  tertiaryDisabledBorderColor: 'rgba(255,255,255,.5)',
  primaryOpacity: 0.83,
  secondaryOpacity: 0.6,
  disabledOpacity: 0.5,
  modalBackgroundColor: transparentGray,
  activeSwitchBackground: 'rgba(0,102,153,0.75)',
  inactiveSwitchBackground: darkgray,
  activeSwitchThumb: blue,
  inactiveSwitchThumb: gray,
  sideMenuBackground: nero,
  topButtonBarBackground: nero,
  sliderTrackColor: darkgray,
  sliderThumbColor: blue,
  cardBackgroundColor: darkgray,
  statusBar: 'light',
};
