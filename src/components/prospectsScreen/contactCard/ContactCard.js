import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Platform, Alert } from 'react-native';
import ExpandedContactCard from './ExpandedContactCard';
import CollapsedContactCard from './CollapsedContactCard';
import ProspectsContext from '../../../contexts/ProspectsContext';
import { Localized } from '../../../translations/Localized';

const ContactCard = ({ data, ...props }) => {
  const {
    isCalloutOpenFromParent,
    setIsCalloutOpenFromParent,
    isTouchDisabled,
    setIsTouchDisabled,
    isFilterMenuOpen,
    closeFilterMenu,
    deleteContact,
  } = useContext(ProspectsContext);
  const { prospectId = '', firstName = '', lastName = '' } = data;
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
    if (isFilterMenuOpen && Platform.OS === 'android') {
      return closeFilterMenu();
    }
    setIsExpanded((state) => !state);
    setIsCalloutOpenFromParent(false);
    closeFilterMenu();
  };

  const onRemove = () => {
    Alert.alert(
      `${Localized('Remove')} "${firstName} ${lastName}"?`,
      Localized('Are you sure you want to remove this person?'),
      [
        {
          text: Localized('Cancel'),
          onPress: () => {
            setIsCalloutOpenFromParent(false);
          },
          style: 'cancel',
        },
        {
          text: Localized('Yes'),
          onPress: () => {
            deleteContact({
              variables: { prospectId },
              onCompleted: () => setIsCalloutOpenFromParent(false),
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  if (isExpanded) {
    return (
      <ExpandedContactCard
        {...props}
        toggleExpanded={toggleExpanded}
        data={data}
        initials={initials}
        onRemove={onRemove}
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
      isFilterMenuOpen={isFilterMenuOpen}
      onRemove={onRemove}
    />
  );
};

ContactCard.propTypes = {
  data: PropTypes.object,
};

export default ContactCard;
