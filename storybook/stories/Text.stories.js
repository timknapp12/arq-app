import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  ScreenContainer,
  H2,
  H4,
  H4Heavy,
  H4Secondary,
  H6,
  AlertText,
  Link,
  H4Book,
  H5,
  H5Heavy,
} from '../../src/components/common';

storiesOf('Texts', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('H2 with Avenir-Light', () => <H2>Business</H2>)
  .add('H4 with Avenir-Light font', () => (
    <H4>Log in if you already have a username and password</H4>
  ))
  .add('H4 Bold', () => (
    <H4Heavy>Log in if you already have a username and password</H4Heavy>
  ))
  .add('H4 Secondary', () => (
    <H4Secondary>
      Log in if you already have a username and password
    </H4Secondary>
  ))
  .add('H4Book', () => (
    <H4Book>Log in if you already have a username and password</H4Book>
  ))
  .add('H5', () => <H5>Log in if you already have a username and password</H5>)
  .add('H5 Bold', () => (
    <H5Heavy>Log in if you already have a username and password</H5Heavy>
  ))
  .add('H6', () => (
    <H6 disabled>Log in if you already have a username and password</H6>
  ))
  .add('Alert Text ', () => (
    <AlertText>
      Sorry, we couldnt log you in. Please re-enter your username and password
    </AlertText>
  ))
  .add('Link Text', () => <Link>Find Out More</Link>);
