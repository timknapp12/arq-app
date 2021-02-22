import React from 'react';
import { Image, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Header from '../../src/components/Header';
import { H2Normal, ScreenContainer } from '../../src/components/Common';
import smallLogo from '../../assets/icons/Q-Sciences-small-logo.png';
import accountIcon from '../../assets/icons/account_circle.png';

storiesOf('Header', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('with text', () => (
    <Header>
      <H2Normal>Business</H2Normal>
    </Header>
  ))
  .add('with text and logo', () => (
    <Header>
      <Image source={smallLogo} style={{ height: 24 }} />
      <H2Normal>Business</H2Normal>
      <View />
    </Header>
  ))
  .add('with account icon and logo', () => (
    <Header>
      <Image source={smallLogo} style={{ height: 24 }} />
      <H2Normal>Business</H2Normal>
      <Image source={accountIcon} style={{ height: 24, width: 24 }} />
    </Header>
  ));
