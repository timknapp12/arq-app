import {
  primaryWhite,
  secondaryWhite,
  disabledWhite,
  black,
  nero,
  darkgray,
  gray,
  lightgray,
  blue,
  red,
  transparentGray,
  cobaltBlue,
  highlightWhite,
  turquoiseGreen,
  turquoiseGreenDark,
  turquoiseGreenLight,
  tumbleweed,
  tumbleweedDark,
  tumbleweedLight,
  lauralGreen,
  lauralGreenDark,
  lauralGreenLight,
  powderBlue,
  powderBlueDark,
  powderBlueLight,
  glossyGrape,
  glossyGrapeDark,
  glossyGrapeLight,
  earthYellow,
  palastinePurple,
  carnelian,
  warningYellow,
  palestinePurple,
} from './colors';
import { dropShadow, lightUpperDropShadow } from './constants';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
export const lightTheme = {
  primaryTextColor: black,
  secondaryTextColor: gray,
  disabledTextColor: gray,
  selectedCardHighlight: black,
  placeholderTextColor: disabledWhite,
  backgroundColor: primaryWhite,
  activeBackground: darkgray,
  inactiveBackground: lightgray,
  activeTint: primaryWhite,
  inactiveTint: blue,
  primaryButtonBackgroundColor: blue,
  secondaryButtonTextColor: blue,
  disabledBackgroundColor: lightgray,
  highlight: blue,
  error: red,
  headerBackgroundColor: blue,
  subheaderBackgroundColor: darkgray,
  tertiarySelectedTextColor: blue,
  tertiaryDisabledTextColor: blue,
  tertiarySelectedBackgroundColor: primaryWhite,
  tertiaryDisabledBackgroundColor: blue,
  tertiarySelectedBorderColor: primaryWhite,
  tertiaryDisabledBorderColor: secondaryWhite,
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
  favoriteFillColor: cobaltBlue,
  statusBar: 'dark',
  subscriptionPie1: turquoiseGreenDark,
  subscriptionPie2: turquoiseGreenLight,
  subscriptionPie3: turquoiseGreen,
  ambassadorEnrollmentsPie1: tumbleweedDark,
  ambassadorEnrollmentsPie2: tumbleweedLight,
  ambassadorEnrollmentsPie3: tumbleweed,
  pcEnrollmentsPie1: lauralGreenDark,
  pcEnrollmentsPie2: lauralGreenLight,
  pcEnrollmentsPie3: lauralGreen,
  eventTicketsPie1: powderBlueDark,
  eventTicketsPie2: powderBlueLight,
  eventTicketsPie3: powderBlue,
  payoutsPie1: glossyGrapeDark,
  payoutsPie2: glossyGrapeLight,
  payoutsPie3: glossyGrape,
  customerAvatarAccent: earthYellow,
  retailAvatarAccent: palastinePurple,
  alertAvatarAccent: carnelian,
  warningAvatarAccent: warningYellow,
  donut1primaryColor: turquoiseGreen,
  donut1secondaryColor: turquoiseGreenLight,
  donut2primaryColor: glossyGrape,
  donut2secondaryColor: glossyGrapeLight,
  donut3primaryColor: tumbleweed,
  donut3secondaryColor: tumbleweedLight,
  dropShadow: dropShadow,
  bubbleShadow: lightUpperDropShadow,
  dropZoneBackgroundColor: nero,
  paneHasContentButtonBackgroundColor: highlightWhite,
  leaderboardCountNumberBackgroundColor: palestinePurple,
};

export const darkTheme = {
  primaryTextColor: primaryWhite,
  secondaryTextColor: secondaryWhite,
  disabledTextColor: gray,
  selectedCardHighlight: highlightWhite,
  placeholderTextColor: disabledWhite,
  backgroundColor: black,
  activeBackground: nero,
  inactiveBackground: nero,
  activeTint: primaryWhite,
  inactiveTint: disabledWhite,
  primaryButtonBackgroundColor: blue,
  secondaryButtonTextColor: blue,
  disabledBackgroundColor: lightgray,
  highlight: blue,
  error: red,
  headerBackgroundColor: black,
  subheaderBackgroundColor: darkgray,
  tertiarySelectedTextColor: primaryWhite,
  tertiaryDisabledTextColor: primaryWhite,
  tertiarySelectedBackgroundColor: 'transparent',
  tertiaryDisabledBackgroundColor: 'transparent',
  tertiarySelectedBorderColor: primaryWhite,
  tertiaryDisabledBorderColor: secondaryWhite,
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
  sliderThumbColor: primaryWhite,
  cardBackgroundColor: darkgray,
  favoriteFillColor: cobaltBlue,
  statusBar: 'light',
  subscriptionPie1: turquoiseGreenDark,
  subscriptionPie2: turquoiseGreenLight,
  subscriptionPie3: turquoiseGreen,
  ambassadorEnrollmentsPie1: tumbleweedDark,
  ambassadorEnrollmentsPie2: tumbleweedLight,
  ambassadorEnrollmentsPie3: tumbleweed,
  pcEnrollmentsPie1: lauralGreenDark,
  pcEnrollmentsPie2: lauralGreenLight,
  pcEnrollmentsPie3: lauralGreen,
  eventTicketsPie1: powderBlueDark,
  eventTicketsPie2: powderBlueLight,
  eventTicketsPie3: powderBlue,
  payoutsPie1: glossyGrapeDark,
  payoutsPie2: glossyGrapeLight,
  payoutsPie3: glossyGrape,
  customerAvatarAccent: earthYellow,
  retailAvatarAccent: palastinePurple,
  alertAvatarAccent: carnelian,
  warningAvatarAccent: warningYellow,
  donut1primaryColor: turquoiseGreen,
  donut1secondaryColor: turquoiseGreenLight,
  donut2primaryColor: glossyGrape,
  donut2secondaryColor: glossyGrapeLight,
  donut3primaryColor: tumbleweed,
  donut3secondaryColor: tumbleweedLight,
  dropShadow: dropShadow,
  bubbleShadow: lightUpperDropShadow,
  dropZoneBackgroundColor: nero,
  paneHasContentButtonBackgroundColor: highlightWhite,
  leaderboardCountNumberBackgroundColor: palestinePurple,
};
