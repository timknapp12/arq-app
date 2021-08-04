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

const NotificationCard = ({
  data,
  // isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  ...props
}) => {
  const { deviceLanguage } = useContext(AppContext);
  const { refetchProspectsNotifications } = useContext(LoginContext);

  const { viewId, isSaved } = data;

  const [isExpanded, setIsExpanded] = useState(true);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  const [notificationHasBeenViewed] = useMutation(
    PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
    {
      variables: { viewId },
      onError: (error) => console.log(`error`, error),
    },
  );

  useEffect(() => {
    notificationHasBeenViewed();
  }, []);

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

  const options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  let [y, m, d, hh, mm, ss, ms] = data?.dateViewUtc.match(/\d+/g);
  let regexDate = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
  let formattedDate = regexDate.toLocaleString(deviceLanguage, options);

  const [onRemove] = useMutation(CLEAR_PROSPECT_NOTIFICATION, {
    variables: { viewId },
    onCompleted: () => refetchProspectsNotifications(),
    onError: (error) => console.log(`error`, error),
  });

  const [handlePin] = useMutation(PIN_PROSPECT_NOTIFICATION, {
    variables: { viewId, pin: isSaved ? false : true },
    onCompleted: () => refetchProspectsNotifications(),
    onError: (error) => console.log(`error`, error),
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
