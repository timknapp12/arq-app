import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Header from '../../src/components/Header';
import {
  H2Normal,
  ScreenContainer,
  AccountIcon,
  SmallQIcon,
  TertiaryButton,
} from '../../src/components/Common';
import DashboardHeader from '../../src/components/HomeScreen/DashboardHeader';
import Subheader from '../../src/components/HomeScreen/Subheader';

storiesOf('Header', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('with text', () => (
    <Header>
      <View />
      <H2Normal>Business</H2Normal>
      <View />
    </Header>
  ))
  .add('with text and logo', () => (
    <Header>
      <SmallQIcon />
      <H2Normal>Business</H2Normal>
      <View />
    </Header>
  ))
  .add('with account icon and logo', () => (
    <Header>
      <SmallQIcon />
      <H2Normal>Business</H2Normal>
      <AccountIcon />
    </Header>
  ))
  .add('Dashboard Header', () => <DashboardHeader badgeValue={3} />)
  .add('subheader', () => (
    <Subheader>
      <TertiaryButton selected>Overview</TertiaryButton>
      <TertiaryButton>Rank</TertiaryButton>
      <TertiaryButton>OV Detail</TertiaryButton>
    </Subheader>
  ));
