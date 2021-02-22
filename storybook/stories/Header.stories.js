import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Header from '../../src/components/Header';
import {
  H2Normal,
  ScreenContainer,
  AccountIcon,
  SmallQIcon,
} from '../../src/components/Common';
import DashboardHeader from '../../src/components/HomeScreen/DashboardHeader';

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
  .add('Dashboard Header', () => <DashboardHeader />);
