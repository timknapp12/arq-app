import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import ExpandedNotificationCard from './ExpandedNotificationCard';
import CollapsedNotificationCard from './CollapsedNotificationCard';
import AppContext from '../../../contexts/AppContext';

const NotificationCard = ({
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  data,
  ...props
}) => {
  const { deviceLanguage } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    if (isExpanded) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent, isExpanded]);

  useEffect(() => {
    if (!isCalloutOpen) {
      setIsTouchDisabled(false);
    }
  }, [isCalloutOpen]);

  const onCallout = async () => {
    // this closes the current callout if the kebob menu on another card is touched
    if (isCalloutOpenFromParent) {
      return setIsCalloutOpenFromParent(false);
    }
    if (isCalloutOpen) {
      setIsCalloutOpenFromParent(false);
    } else if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
      setIsTouchDisabled(true);
    }
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
    }
  };

  const toggleExpanded = () => {
    if (isTouchDisabled && Platform.OS === 'android') {
      return setIsCalloutOpenFromParent(false);
    }
    setIsExpanded((state) => !state);
    setIsCalloutOpenFromParent(false);
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

  const onViewProspect = () => {};

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
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isTouchDisabled: PropTypes.bool.isRequired,
  setIsTouchDisabled: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default NotificationCard;
