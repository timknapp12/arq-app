import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import { H5Black, H6Book } from '../../common';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import NotificationCalloutMenu from './NotificationCalloutMenu';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import {
  CLEAR_PROSPECT_NOTIFICATION,
  PIN_PROSPECT_NOTIFICATION,
  PROSPECT_NOTIFICATION_HAS_BEEN_VIEWED,
} from '../../../graphql/mutations';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
  IconColumn,
  IconRow,
} from './notificationCard.styles';
import { Localized } from '../../../translations/Localized';

const NotificationCard = ({
  data,
  onClose,
  idOfExpandedCard,
  setIdOfExpandedCard,
  ...props
}) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  const { refetchProspectsNotifications } = useContext(LoginContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadYet, setIsReadYet] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  const { viewId, isSaved, prospect, sentLinks } = data;
  const { firstName, lastName } = prospect;
  const { displayName } = sentLinks;

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
  const onViewProspect = () => {
    onClose();
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Search Screen',
      params: {
        searchTermFromNotifications: `${data?.prospect?.firstName ?? ''} ${
          data?.prospect?.lastName ?? ''
        }`,
      },
    });
  };

  const body =
    'jkhsdkjf kjshfkjhf lkjshfkjhkjf kjsahf kjsdf  jkhsdjkfh kjshfkjh kjhsakjfhjkh kjjjh ksakj a s the d skdkj skf k khkhkjh sfjkhjt  ';

  const iconStyle = {
    marginEnd: 4,
    height: 32,
    width: 32,
    color: theme.primaryTextColor,
  };

  const toggleExpand = () => {
    if (Platform.OS === 'android' && idOfExpandedCard !== 0)
      return setIdOfExpandedCard(0);
    setIsReadYet(true);
    setIsExpanded((state) => !state);
    setIdOfExpandedCard(0);
  };

  const onCallout = () => {
    setIsCalloutOpen((state) => !state);
    if (isCalloutOpen) return setIdOfExpandedCard(0);
    setIdOfExpandedCard(viewId);
  };

  useEffect(() => {
    setIsCalloutOpen(viewId === idOfExpandedCard);

    return () => {
      setIsCalloutOpen(false);
    };
  }, [idOfExpandedCard]);

  return (
    <CardContainer
      onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)}
      {...props}
    >
      <OuterContainer isExpanded={isExpanded} isReadYet={!isReadYet}>
        <InnerContainer
          isExpanded={isExpanded}
          activeOpacity={1}
          onPress={toggleExpand}
        >
          <TitleAndDateContainer>
            <H5Black>{properlyCaseName(firstName, lastName)}</H5Black>
            {formattedDate ? (
              <H6Book style={{ marginEnd: 16 }}>{formattedDate}</H6Book>
            ) : null}
          </TitleAndDateContainer>
          {displayName ? (
            <H6Book
              style={{ marginTop: !isReadYet ? 0 : isExpanded ? 4 : -22 }}
            >{`${Localized('Viewed')} ${displayName}`}</H6Book>
          ) : null}
          {isExpanded ? (
            <H6Book ellipsizeMode="tail" numberOfLines={20} style={{ flex: 1 }}>
              {body}
            </H6Book>
          ) : (
            <H6Book ellipsizeMode="tail" numberOfLines={3} style={{ flex: 1 }}>
              {body}
            </H6Book>
          )}
        </InnerContainer>
        <IconColumn isExpanded={isExpanded}>
          <TouchableOpacity onPress={toggleExpand}>
            <MaterialCommunityIcon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              color={theme.primaryTextColor}
              size={24}
            />
          </TouchableOpacity>
          {!isExpanded && (
            <TouchableOpacity style={{ padding: 4 }} onPress={onCallout}>
              <KebobIcon
                style={{
                  height: 20,
                  width: 20,
                  color: theme.primaryTextColor,
                }}
              />
            </TouchableOpacity>
          )}
        </IconColumn>
        {isExpanded && (
          <IconRow>
            <TouchableOpacity onPress={onRemove}>
              <RemoveIcon style={iconStyle} />
            </TouchableOpacity>
            {isSaved ? (
              <TouchableOpacity onPress={handlePin}>
                <UnpinIcon style={iconStyle} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handlePin}>
                <PinIcon style={iconStyle} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onViewProspect}>
              <ViewProspectIcon style={iconStyle} />
            </TouchableOpacity>
          </IconRow>
        )}
      </OuterContainer>
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

NotificationCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  idOfExpandedCard: PropTypes.number.isRequired,
  setIdOfExpandedCard: PropTypes.func.isRequired,
};

export default NotificationCard;
