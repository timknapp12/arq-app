import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  H4,
  ScreenContainer,
  AccountIcon,
  SmallQIcon,
  TertiaryButton,
  Subheader,
  Header,
} from '../../src/components/common';
import MainHeader from '../../src/components/mainHeader/MainHeader';

storiesOf('Header', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('with text', () => (
    <Header>
      <View />
      <H4>Business</H4>
      <View />
    </Header>
  ))
  .add('with text and logo', () => (
    <Header>
      <SmallQIcon />
      <H4>Business</H4>
      <View />
    </Header>
  ))
  .add('with account icon and logo', () => (
    <Header>
      <SmallQIcon />
      <H4>Business</H4>
      <AccountIcon />
    </Header>
  ))
  .add('Dashboard Header', () => <MainHeader badgeValue={3} />)
  .add('subheader', () => (
    <Subheader>
      <TertiaryButton selected>Overview</TertiaryButton>
      <TertiaryButton>Rank</TertiaryButton>
      <TertiaryButton>OV Detail</TertiaryButton>
    </Subheader>
  ));
