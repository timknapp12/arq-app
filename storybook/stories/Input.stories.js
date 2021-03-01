import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { gray } from '../../src/Styles/colors';

import {
  ScreenContainer,
  Input,
  Flexbox,
  AnimatedInput,
} from '../../src/components/Common';

const CustomContainer = () => {
  const [value, setValue] = useState('');

  return (
    <AnimatedInput
      label="Username"
      value={value}
      onChangeText={(text) => setValue(text)}
    />
  );
};

storiesOf('Inputs', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('Input default', () => (
    <Input placeholderTextColor={gray} placeholder="email" />
  ))
  .add('with secure password', () => (
    <Input
      placeholderTextColor={gray}
      placeholder="password"
      textContentType="password"
    />
  ))
  .add('2 inputs to check onFocus', () => (
    <Flexbox>
      <Input placeholderTextColor={gray} placeholder="username" />
      <Input placeholderTextColor={gray} placeholder="password" />
    </Flexbox>
  ))
  .add('with 20 padding on right and left', () => (
    <Flexbox justify="space-between" height="110px" padding={20}>
      <Input placeholderTextColor={gray} placeholder="username" />
      <Input placeholderTextColor={gray} placeholder="password" />
    </Flexbox>
  ))
  .add('Animated Input', () => <CustomContainer />);
