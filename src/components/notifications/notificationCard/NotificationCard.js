import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import { H5Black, H6Book } from '../../common';
import TrashCanIcon from '../../../../assets/icons/TrashCanIcon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import AppContext from '../../../contexts/AppContext';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import {
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
  IconColumn,
  IconRow,
} from './notificationCard.styles';
import { Localized } from '../../../translations/Localized';

const NotificationCard = ({
  data,
  idOfExpandedCard,
  setIdOfExpandedCard,
  onCallout,
  onRemove,
  handlePin,
  onViewProspect,
}) => {
  const { theme, deviceLanguage } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadYet, setIsReadYet] = useState(false);

  const { isSaved, prospect, sentLinks } = data;
  const { firstName, lastName } = prospect;
  const { displayName } = sentLinks;

  const formattedDate = getLocalDate(data?.dateViewUtc, deviceLanguage);

  const body =
    'This is a body of text in a notification. Who knows what will actually be displayed here? Perhaps it will be that the San Diego Padres won the pennant!';

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

  return (
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
            style={{ marginTop: !isReadYet ? 0 : isExpanded ? 8 : -22 }}
          >{`${Localized('Viewed')} ${displayName}`}</H6Book>
        ) : null}
        {isExpanded ? (
          <H6Book ellipsizeMode="tail" numberOfLines={20} style={{ flex: 1 }}>
            {body}
          </H6Book>
        ) : (
          <H6Book ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
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
            <TrashCanIcon style={iconStyle} />
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
  );
};

NotificationCard.propTypes = {
  data: PropTypes.object.isRequired,
  idOfExpandedCard: PropTypes.number.isRequired,
  setIdOfExpandedCard: PropTypes.func.isRequired,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  onCallout: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
};

export default NotificationCard;
