import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import {
  ScreenContainer,
  PrimaryButton,
  Flexbox,
  TertiaryButton,
  Switch,
} from '../../src/components/Common';
import Subheader from '../../src/components/Headers/Subheader';

const SwitchExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return <Switch onValueChange={toggleSwitch} value={isEnabled} />;
};

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

storiesOf('Tertiary Button', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('with text', () => <TertiaryButton>Overview</TertiaryButton>)
  .add('selected', () => <TertiaryButton selected>Overview</TertiaryButton>)
  .add('with subheader', () => (
    <Subheader>
      <TertiaryButton selected>Overview</TertiaryButton>
      <TertiaryButton>Rank</TertiaryButton>
      <TertiaryButton>OV Detail</TertiaryButton>
    </Subheader>
  ));

storiesOf('Switch', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('default', () => <SwitchExample />);
