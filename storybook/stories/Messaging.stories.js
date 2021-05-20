import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Linking, Platform } from 'react-native';
import {
  ScreenContainer,
  PrimaryButton,
  Input,
  Label,
} from '../../src/components/common';

const separator = Platform.OS === 'ios' ? '&' : '?';
const message = `Hello, this is a link to an asset`;

const EmailExample = () => {
  const [email, setEmail] = useState('');
  return (
    <>
      <Label>Enter an email address</Label>
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        onPress={() =>
          Linking.openURL(`mailto:${email}?subject=SendMail&body=${message}`)
        }>
        Send Email
      </PrimaryButton>
    </>
  );
};

const TextExample = () => {
  const [phone, setPhone] = useState('');
  return (
    <>
      <Label>Enter a phone number (no spaces)</Label>
      <Input
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        onPress={() =>
          Linking.openURL(`sms:${phone}${separator}body=${message}`)
        }>
        Send Text
      </PrimaryButton>
    </>
  );
};

storiesOf('Messaging', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('send email', () => <EmailExample />)
  .add('send text', () => <TextExample />);
