import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  ScreenContainer,
  H2Bold,
  H2Normal,
  H4,
  H4Bold,
  H4Secondary,
  H6,
  AlertText,
  Link,
} from '../../src/components/Common';

storiesOf('Texts', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('H2Bold with Nunito-Black (for inside button)', () => (
    <H2Bold>Send Email</H2Bold>
  ))
  .add('H2Normal with Nunito-Regular', () => <H2Normal>Business</H2Normal>)
  .add('H4 with Nunito-Regular font', () => (
    <H4>Log in if you already have a username and password</H4>
  ))
  .add('H4 Bold', () => (
    <H4Bold>Log in if you already have a username and password</H4Bold>
  ))
  .add('H4 Secondary', () => (
    <H4Secondary>
      Log in if you already have a username and password
    </H4Secondary>
  ))
  .add('H6 with Roboto font', () => (
    <H6 disabled>Log in if you already have a username and password</H6>
  ))
  .add('Alert Text ', () => (
    <AlertText>
      Sorry, we couldnt log you in. Please re-enter your username and password
    </AlertText>
  ))
  .add('Link Text', () => <Link>Find Out More</Link>);
