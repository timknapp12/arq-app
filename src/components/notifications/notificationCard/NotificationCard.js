import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpandedNotificationCard from './ExpandedNotificationCard';
import CollapsedNotificationCard from './CollapsedNotificationCard';
import AppContext from '../../../contexts/AppContext';

const NotificationCard = ({
  data,
  // isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  ...props
}) => {
  const { deviceLanguage } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

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

  let [y, m, d, hh, mm, ss, ms] = data?.dateSent.match(/\d+/g);
  let regexDate = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
  let formattedDate = regexDate.toLocaleString(deviceLanguage, options);

  const onRemove = () => {};

  const onPin = () => {};

  const onUnpin = () => {};

  const handlePin = () => {
    if (data.isSaved) {
      onUnpin();
    } else {
      onPin();
    }
  };
  const navigation = useNavigation();

  const onViewProspect = () =>
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Search Screen',
      params: {
        searchTermFromNotifications: 'Tim Knapp',
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
