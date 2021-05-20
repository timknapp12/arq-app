import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Linking, Platform } from 'react-native';
import { ScreenContainer, PrimaryButton } from '../../src/components/common';

const separator = Platform.OS === 'ios' ? '&' : '?';
const message = `Hello, this is a link to an asset`;

storiesOf('Messaging', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('send email', () => (
    <PrimaryButton
      onPress={() =>
        Linking.openURL(
          `mailto:timknapp12@hotmail.com?subject=SendMail&body=${message}`,
        )
      }>
      Send Email
    </PrimaryButton>
  ))
  .add('send text', () => (
    <PrimaryButton
      onPress={() =>
        Linking.openURL(`sms:8018309674${separator}body=${message}`)
      }>
      Send Text
    </PrimaryButton>
  ));
