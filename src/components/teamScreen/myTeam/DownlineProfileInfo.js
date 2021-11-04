import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { H2Book, H5, H6, LevelLabel, Flexbox } from '../../common';
import { Localized } from '../../../translations/Localized';
import {
  ThumbnailImage,
  DefaultThumbnailBackground,
  NameAndRankContainer,
  LevelIndicatorContainer,
  LevelIndicator,
} from './myTeamCard.styles';

const DownlineProfileInfo = ({ member, level }) => {
  const { firstName, lastName, pictureUrl, associateType } = member?.associate;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  const associateTypeMap = {
    AMBASSADOR: member?.rank?.rankName,
    PREFERRED: Localized('Preferred Customer'),
    RETAIL: Localized('Retail'),
  };

  const associateTypeLabel = associateTypeMap[associateType];

  return (
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
        <LevelIndicator associateType={associateType}>
          {level ? <LevelLabel>{level}</LevelLabel> : null}
        </LevelIndicator>
      </LevelIndicatorContainer>
      <NameAndRankContainer>
        <H5>{`${firstName} ${lastName}`}</H5>
        <Flexbox direction="row">
          <H6>{associateTypeLabel}</H6>
          <H6>{member?.associate?.legacyAssociateId}</H6>
        </Flexbox>
      </NameAndRankContainer>
    </>
  );
};

DownlineProfileInfo.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
};

export default DownlineProfileInfo;
