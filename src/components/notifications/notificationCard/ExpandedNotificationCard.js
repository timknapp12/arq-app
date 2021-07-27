import React from 'react';
import { Text } from 'react-native';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
} from './notificationCard.styles';

const ExpandedNotificationCard = () => {
  return (
    <CardContainer>
      <OuterContainer>
        <InnerContainer>
          <TitleAndDateContainer>
            <Text> Expanded Notification Card</Text>
          </TitleAndDateContainer>
        </InnerContainer>
      </OuterContainer>
    </CardContainer>
  );
};

export default ExpandedNotificationCard;
