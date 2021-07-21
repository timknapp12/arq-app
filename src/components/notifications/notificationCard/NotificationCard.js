import React from 'react';
import { Text } from 'react-native';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
} from './notificationCard.styles';

const NotificationCard = () => {
  return (
    <CardContainer>
      <OuterContainer>
        <InnerContainer>
          <TitleAndDateContainer>
            <Text>Notification Card</Text>
          </TitleAndDateContainer>
        </InnerContainer>
      </OuterContainer>
    </CardContainer>
  );
};

export default NotificationCard;
