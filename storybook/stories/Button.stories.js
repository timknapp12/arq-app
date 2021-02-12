import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import {
  ScreenContainer,
  PrimaryButton,
  Flexbox,
} from '../../src/components/Common';

storiesOf('Primary Button', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('with text', () => (
    <PrimaryButton onPress={action('clicked-text')}>Hello</PrimaryButton>
  ))
  .add('with some emojis', () => (
    <PrimaryButton onPress={action('clicked-emoji')}>😀 😎 👍 💯</PrimaryButton>
  ))
  .add('disabled', () => (
    <PrimaryButton onPress={action('clicked-disabled')} disabled>
      Log In
    </PrimaryButton>
  ))
  .add('with padding', () => (
    <Flexbox width="85%">
      <PrimaryButton onPress={action('log-in')}>Log In</PrimaryButton>
    </Flexbox>
  ));
