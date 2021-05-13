import React from 'react';
import * as Notifications from 'expo-notifications';
import { storiesOf } from '@storybook/react-native';
import {
  ScreenContainer,
  PrimaryButton,
  Flexbox,
} from '../../src/components/common';

const LocalNotification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail!",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
        ios: { _displayInForeground: true },
      },
      trigger: null,
    });
  };

  return (
    <Flexbox>
      <PrimaryButton onPress={schedulePushNotification}>
        Push for notification
      </PrimaryButton>
    </Flexbox>
  );
};

storiesOf('Notifications', module)
  .addDecorator((getStory) => <ScreenContainer>{getStory()}</ScreenContainer>)
  .add('local notification', () => <LocalNotification />);
