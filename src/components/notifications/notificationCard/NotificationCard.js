import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpandedNotificationCard from './ExpandedNotificationCard';
import CollapsedNotificationCard from './CollapsedNotificationCard';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import {
  CLEAR_PROSPECT_NOTIFICATION,
  PIN_PROSPECT_NOTIFICATION,
  PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
} from '../../../graphql/mutations';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';

const NotificationCard = ({
  data,
  // isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  ...props
}) => {
  const { deviceLanguage } = useContext(AppContext);
  const { refetchProspectsNotifications, displayNotifications } =
    useContext(LoginContext);

  const { viewId, isSaved } = data;

  const [isExpanded, setIsExpanded] = useState(true);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  const [notificationHasBeenViewed] = useMutation(
    PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
    {
      variables: { viewId },
      onError: (error) =>
        console.log(`error in prospect notification hs been viewed`, error),
    },
  );

  useEffect(() => {
    if (displayNotifications) {
      notificationHasBeenViewed();
    }
  }, [displayNotifications]);

  useEffect(() => {
    if (!isCalloutOpen) {
      setIsTouchDisabled(false);
    }
  }, [isCalloutOpen]);

  const onCallout = () => {
    setIsCalloutOpen((state) => !state);
  };

  const toggleExpanded = () => {
    if (isTouchDisabled && Platform.OS === 'android') {
      return setIsCalloutOpenFromParent(false);
    }
    setIsExpanded((state) => !state);
    setIsCalloutOpen(false);
  };

  const formattedDate = getLocalDate(data?.dateViewUtc, deviceLanguage);

  const [onRemove] = useMutation(CLEAR_PROSPECT_NOTIFICATION, {
    variables: { viewId },
    onCompleted: () => refetchProspectsNotifications(),
    onError: (error) =>
      console.log(`error in delete prospect notification:`, error),
  });

  const [handlePin] = useMutation(PIN_PROSPECT_NOTIFICATION, {
    variables: { viewId, pin: isSaved ? false : true },
    onCompleted: () => refetchProspectsNotifications(),
    onError: (error) =>
      console.log(`error in pin prospect notification`, error),
  });

  const navigation = useNavigation();
  const onViewProspect = () =>
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Search Screen',
      params: {
        searchTermFromNotifications: `${data?.prospect?.firstName ?? ''} ${
          data?.prospect?.lastName ?? ''
        }`,
      },
    });

  if (isExpanded) {
    return (
      <ExpandedNotificationCard
        {...props}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
        data={data}
        dateSent={formattedDate}
        onRemove={onRemove}
        handlePin={handlePin}
        onViewProspect={onViewProspect}
      />
    );
  }

  return (
    <CollapsedNotificationCard
      {...props}
      toggleExpanded={toggleExpanded}
      data={data}
      dateSent={formattedDate}
      onRemove={onRemove}
      handlePin={handlePin}
      onViewProspect={onViewProspect}
      isCalloutOpen={isCalloutOpen}
      onCallout={onCallout}
    />
  );
};

NotificationCard.propTypes = {
  data: PropTypes.object,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isTouchDisabled: PropTypes.bool.isRequired,
  setIsTouchDisabled: PropTypes.func.isRequired,
};

export default NotificationCard;
