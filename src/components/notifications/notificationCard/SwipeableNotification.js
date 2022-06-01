import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../contexts/AppContext';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import NotificationCard from './NotificationCard';
import NotificationCalloutMenu from './NotificationCalloutMenu';
import {
  CLEAR_PROSPECT_NOTIFICATION,
  PIN_PROSPECT_NOTIFICATION,
  PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
} from '../../../graphql/mutations';
import { GET_PROSPECT_NOTIFICATIONS } from '../../../graphql/queries';

import {
  CardContainer,
  SwipedButtonContainer,
  SwipedButton,
} from './notificationCard.styles';

const SwipeableNotification = ({
  data,
  idOfExpandedCard,
  setIdOfExpandedCard,
  isCalloutOpenFromParent,
  ...props
}) => {
  const { theme, associateId } = useContext(AppContext);

  const { viewId, isSaved } = data;

  const [notificationHasBeenViewed] = useMutation(
    PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
    {
      variables: { viewId },
      onError: (error) =>
        console.log(`error in prospect notification hs been viewed`, error),
    },
  );

  useEffect(() => {
    notificationHasBeenViewed();
  }, []);

  const [onRemove] = useMutation(CLEAR_PROSPECT_NOTIFICATION, {
    variables: { viewId },
    refetchQueries: [
      { query: GET_PROSPECT_NOTIFICATIONS, variables: { associateId } },
    ],
    onError: (error) =>
      console.log(`error in delete prospect notification:`, error),
  });

  const [handlePin] = useMutation(PIN_PROSPECT_NOTIFICATION, {
    variables: { viewId, pin: isSaved ? false : true },
    refetchQueries: [
      { query: GET_PROSPECT_NOTIFICATIONS, variables: { associateId } },
    ],
    onError: (error) =>
      console.log(`error in pin prospect notification`, error),
  });

  const navigation = useNavigation();
  const onViewProspect = () => {
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Search Screen',
      params: {
        searchTermFromNotifications: `${data?.prospect?.firstName ?? ''} ${
          data?.prospect?.lastName ?? ''
        }`,
      },
    });
  };

  const [cardHeight, setCardHeight] = useState(0);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  const onCallout = () => {
    setIsCalloutOpen((state) => !state);
    if (isCalloutOpen) return setIdOfExpandedCard(0);
    setIdOfExpandedCard(viewId);
  };

  useEffect(() => {
    setIsCalloutOpen(viewId === idOfExpandedCard);
  }, [idOfExpandedCard]);

  useEffect(() => {
    if (!isCalloutOpenFromParent) return setIsCalloutOpen(false);
  }, [isCalloutOpenFromParent]);

  const iconStyle = {
    height: 32,
    width: 32,
    color: theme.primaryTextColor,
  };

  const RenderRight = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-70, 0.5],
      outputRange: [1, 0.5],
    });
    const transformStyle = {
      transform: [{ scale }],
    };
    return (
      <SwipedButtonContainer>
        <SwipedButton
          style={{
            marginStart: 4,
            backgroundColor: theme.leaderboardCountNumberBackgroundColor,
          }}
          onPress={onRemove}
        >
          <Animated.View style={[transformStyle]}>
            <RemoveIcon style={iconStyle} />
          </Animated.View>
        </SwipedButton>
        <SwipedButton
          style={{ marginStart: 4, backgroundColor: theme.alertAvatarAccent }}
          onPress={onViewProspect}
        >
          <Animated.View style={[transformStyle]}>
            <ViewProspectIcon style={iconStyle} />
          </Animated.View>
        </SwipedButton>
      </SwipedButtonContainer>
    );
  };

  const RenderLeft = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0.5, 20],
      outputRange: [0.5, 1],
    });
    const transformStyle = {
      transform: [{ scale }],
    };
    return (
      <SwipedButtonContainer>
        <SwipedButton
          style={{ marginEnd: 4, backgroundColor: theme.customerAvatarAccent }}
          onPress={handlePin}
        >
          <Animated.View style={[transformStyle]}>
            {isSaved ? (
              <UnpinIcon style={iconStyle} />
            ) : (
              <PinIcon style={iconStyle} />
            )}
          </Animated.View>
        </SwipedButton>
      </SwipedButtonContainer>
    );
  };

  return (
    <CardContainer
      {...props}
      onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)}
    >
      <Swipeable
        overshootRight={false}
        overshootLeft={false}
        renderRightActions={RenderRight}
        renderLeftActions={RenderLeft}
      >
        <NotificationCard
          data={data}
          idOfExpandedCard={idOfExpandedCard}
          setIdOfExpandedCard={setIdOfExpandedCard}
          isCalloutOpenFromParent={isCalloutOpenFromParent}
          onCallout={onCallout}
          onRemove={onRemove}
          handlePin={handlePin}
          onViewProspect={onViewProspect}
        />
      </Swipeable>
      {isCalloutOpen && (
        <NotificationCalloutMenu
          cardHeight={cardHeight}
          onRemove={onRemove}
          handlePin={handlePin}
          onViewProspect={onViewProspect}
          isSaved={isSaved}
        />
      )}
    </CardContainer>
  );
};

SwipeableNotification.propTypes = {
  data: PropTypes.object.isRequired,
  idOfExpandedCard: PropTypes.number.isRequired,
  setIdOfExpandedCard: PropTypes.func.isRequired,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
};

export default SwipeableNotification;
