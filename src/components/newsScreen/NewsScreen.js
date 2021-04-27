import React, { useEffect, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import { ScreenContainer, H4 } from '../common';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import AppContext from '../../contexts/AppContext';
import { Button } from 'react-native';

const NewsScreen = () => {
  const { storeTimeStamp } = useContext(AppContext);

  storeTimeStamp();
  const isFocused = useIsFocused();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('News_Screen_Visited', {
        screen: 'News Screen',
        purpose: 'User navigated to News Screen',
      });
    }
  }, [isFocused]);

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
    <ScreenContainer>
      <H4>News Screen</H4>
      <Button
        title="Press to trigger a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </ScreenContainer>
  );
};

export default NewsScreen;
