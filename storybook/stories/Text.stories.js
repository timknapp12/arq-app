import React from 'react';
import { storiesOf } from '@storybook/react-native';

import {
  ScreenContainer,
  H2,
  H4,
  H6,
  AlertText,
} from '../../src/components/Common';

storiesOf('Texts', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('H2 with Nunito-Black (for inside button)', () => <H2>Send Email</H2>)
  .add('H4 with Nunito-Regular font', () => (
    <H4>Log in if you already have a username and password</H4>
  ))
  .add('H6 with Roboto font', () => (
    <H6 disabled>Log in if you already have a username and password</H6>
  ))
  .add('Alert Text ', () => (
    <AlertText>
      Sorry, we couldnt log you in. Please re-enter your username and password
    </AlertText>
  ));
