import React from 'react';
import { Text } from 'react-native';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
} from './notificationCard.styles';

const CollapsedNotificationCard = () => {
  return (
    <CardContainer>
      <OuterContainer>
        <InnerContainer>
          <TitleAndDateContainer>
            <Text>Collapsed Notification Card</Text>
          </TitleAndDateContainer>
        </InnerContainer>
      </OuterContainer>
    </CardContainer>
  );
};

export default CollapsedNotificationCard;
