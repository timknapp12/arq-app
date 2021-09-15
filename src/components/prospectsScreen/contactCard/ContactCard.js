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
    subject,
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

  const [thumbnailUrl, setThumbnailUrl] = useState(data?.thumbnailUrl || '');

  // react native Image has a bug - using the setTimeout is a work around to force the image to rerender when the url has changed
  useEffect(() => {
    const timer = setTimeout(() => {
      setThumbnailUrl(data?.thumbnailUrl);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [data?.thumbnailUrl]);

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
  const defaultMessageIntro = `${Localized(
    'Here is the information from Q Sciences for',
  )} ${subject}: `;

  const variables = {
    associateId,
    prospectId,
    description: 'prospect link',
    // display name is the title of the link that will later show up in prospect notifications
    displayName: subject,
    redirectUrl: redirectUrl,
    sentLinkId: '',
  };

  const [getProspectUrl] = useMutation(GET_PROSPECT_URL, {
    variables: variables,
    onCompleted: async (data) => {
      const message = data?.addUpdateProspectLink?.prospectUrl;
      if (messageType === 'email') {
        onEmail(emailAddress, `${defaultMessageIntro}${message}`);
      } else if (messageType === 'text') {
        onMessage(primaryPhone, `${defaultMessageIntro}${message}`);
      }
    },
    onError: (error) => console.log(`error in getProspectUrl:`, error),
  });

  const sendEmail = async () => {
    await setMessageType('email');
    if (prospectLinkIsNeeded) {
      await getProspectUrl();
    } else {
      onEmail(emailAddress);
    }
    setIsCalloutOpenFromParent(false);
  };

  const sendText = async () => {
    await setMessageType('text');
    if (prospectLinkIsNeeded) {
      await getProspectUrl();
    } else {
      onMessage(primaryPhone);
    }
    setIsCalloutOpenFromParent(false);
  };

  if (isExpanded) {
    return (
      <ExpandedContactCard
        {...props}
        toggleExpanded={toggleExpanded}
        data={data}
        thumbnailUrl={thumbnailUrl}
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
      thumbnailUrl={thumbnailUrl}
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
