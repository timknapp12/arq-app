import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import ExpandedContactCard from './ExpandedContactCard';
import CollapsedContactCard from './CollapsedContactCard';

const ContactCard = ({
  data,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  ...props
}) => {
  const { firstName = '', lastName = '' } = data;
  const initials = firstName.slice(0, 1) + lastName.slice(0, 1);
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

  if (isExpanded) {
    return (
      <ExpandedContactCard
        {...props}
        toggleExpanded={toggleExpanded}
        data={data}
        initials={initials}
      />
    );
  }
  return (
    <CollapsedContactCard
      {...props}
      toggleExpanded={toggleExpanded}
      data={data}
      initials={initials}
      isCalloutOpen={isCalloutOpen}
      onCallout={onCallout}
    />
  );
};

ContactCard.propTypes = {
  data: PropTypes.object.isRequired,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isTouchDisabled: PropTypes.bool.isRequired,
  setIsTouchDisabled: PropTypes.func.isRequired,
};

export default ContactCard;
