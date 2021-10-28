import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H2Book, H5, LevelLabel } from '../../../common';
import {
  ThumbnailImage,
  DefaultThumbnailBackground,
  ProfileInfoTouchable,
  NameAndRankContainer,
  LevelIndicatorContainer,
  LevelIndicator,
} from './myAmbassadorCard.styles';
import AppContext from '../../../../contexts/AppContext';

const DownlineProfileInfo = ({ member, isExpanded, onPress, level }) => {
  const { theme } = useContext(AppContext);

  const { firstName, lastName, pictureUrl } = member?.associate;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  return (
    <ProfileInfoTouchable activeOpacity={1} onPress={onPress}>
      <>
        <View>
          {pictureUrl ? (
            <ThumbnailImage source={{ uri: pictureUrl }} />
          ) : (
            <DefaultThumbnailBackground>
              <H2Book>{initials.toUpperCase()}</H2Book>
            </DefaultThumbnailBackground>
          )}
        </View>
        <LevelIndicatorContainer>
          <LevelIndicator>
            <LevelLabel>{level}</LevelLabel>
          </LevelIndicator>
        </LevelIndicatorContainer>
        <NameAndRankContainer>
          <H5>{`${firstName} ${lastName}`}</H5>
          <H5>{member?.rank?.rankName}</H5>
        </NameAndRankContainer>
        <View>
          <MaterialCommunityIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={theme.primaryTextColor}
            size={24}
          />
        </View>
      </>
    </ProfileInfoTouchable>
  );
};

DownlineProfileInfo.propTypes = {
  member: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  level: PropTypes.number,
};

export default DownlineProfileInfo;
