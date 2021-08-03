import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Platform, Alert } from 'react-native';
import ExpandedContactCard from './ExpandedContactCard';
import CollapsedContactCard from './CollapsedContactCard';
import AppContext from '../../../contexts/AppContext';
import ProspectsContext from '../../../contexts/ProspectsContext';
import { Localized } from '../../../translations/Localized';
import { GET_PROSPECT_URL } from '../../../graphql/mutations';

const ContactCard = ({
  data,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isTouchDisabled,
  setIsTouchDisabled,
  isFilterMenuOpen = false,
  closeFilterMenu = () => {},
  ...props
}) => {
  const { associateId } = useContext(AppContext);
  const {
    deleteProspect,
    onEmail,
    onMessage,
    redirectUrl,
    prospectLinkIsNeeded,
  } = useContext(ProspectsContext);
  const {
    prospectId = '',
    firstName = '',
    lastName = '',
    emailAddress,
    primaryPhone,
  } = data;
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
            deleteProspect({
              variables: { prospectId },
              onCompleted: () => setIsCalloutOpenFromParent(false),
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  // send regular message or prospect link to prospect depending on whether user got to this screen from assets to "share to prospect"
  const [messageType, setMessageType] = useState('');

  const variables = {
    associateId,
    prospectId,
    description: 'prospect link',
    displayName: `${firstName} ${lastName}`,
    redirectUrl: redirectUrl,
    sentLinkId: '',
  };

  const [getProspectUrl, { data: prospectUrlData }] = useMutation(
    GET_PROSPECT_URL,
    {
      variables: variables,
      onCompleted: (data) => {
        const message = data?.addUpdateProspectLink?.prospectUrl;
        if (messageType === 'email') {
          onEmail(emailAddress, message);
        } else if (messageType === 'text') {
          onMessage(primaryPhone, message);
        }
      },
      onError: (error) => console.log(`error`, error),
    },
  );

  const sendEmail = async () => {
    setMessageType('email');
    if (prospectLinkIsNeeded) {
      await getProspectUrl();
      onEmail(
        emailAddress,
        prospectUrlData?.addUpdateProspectLink?.prospectUrl,
      );
    } else {
      onEmail(emailAddress);
    }
  };

  const sendText = async () => {
    setMessageType('text');
    if (prospectLinkIsNeeded) {
      await getProspectUrl();
      onMessage(
        primaryPhone,
        prospectUrlData?.addUpdateProspectLink?.prospectUrl,
      );
    } else {
      onMessage(primaryPhone);
    }
  };

  if (isExpanded) {
    return (
      <ExpandedContactCard
        {...props}
        toggleExpanded={toggleExpanded}
        data={data}
        initials={initials}
        onRemove={onRemove}
        isCalloutOpenFromParent={isCalloutOpenFromParent}
        sendEmail={sendEmail}
        sendText={sendText}
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
      sendEmail={sendEmail}
      sendText={sendText}
    />
  );
};

ContactCard.propTypes = {
  data: PropTypes.object,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isTouchDisabled: PropTypes.bool.isRequired,
  setIsTouchDisabled: PropTypes.func.isRequired,
  isFilterMenuOpen: PropTypes.bool,
  closeFilterMenu: PropTypes.func,
};

export default ContactCard;
