import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import { ScreenContainer, PrimaryButton } from '../../src/components/Common';

storiesOf('Primary Button', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('with text', () => (
    <PrimaryButton onPress={action('clicked-text')}>Hello</PrimaryButton>
  ))
  .add('with some emojis', () => (
    <PrimaryButton onPress={action('clicked-emoji')}>😀 😎 👍 💯</PrimaryButton>
  ))
  .add('disabled', () => <PrimaryButton disabled>Log In</PrimaryButton>);
