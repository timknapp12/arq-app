import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import ExpandedNotificationCard from './ExpandedNotificationCard';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import {
  CLEAR_PROSPECT_NOTIFICATION,
  PIN_PROSPECT_NOTIFICATION,
  PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
} from '../../../graphql/mutations';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';

const NotificationCard = ({ data, ...props }) => {
  const { deviceLanguage } = useContext(AppContext);
  const { refetchProspectsNotifications } = useContext(LoginContext);

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

  return (
    <ExpandedNotificationCard
      {...props}
      data={data}
      dateSent={formattedDate}
      onRemove={onRemove}
      handlePin={handlePin}
      onViewProspect={onViewProspect}
    />
  );
};

NotificationCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NotificationCard;
