import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { H4Book, H5, H6, LevelLabel, Flexbox } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { filterMemberByStatusAndType } from '../../../utils/teamView/filterDownline';
import capitalizeFirstLetterOfEachWord from '../../../utils/capitalizeFirstLetterOfEachWord/capitalizeFirstLetterOfEachWord';
import {
  ThumbnailImage,
  DefaultThumbnailBackground,
  NameAndRankContainer,
  LevelIndicatorContainer,
  LevelIndicator,
} from './myTeamCard.styles';

const DownlineProfileInfo = ({ member, level, showAccentColor = true }) => {
  const { theme } = useContext(AppContext);
  const { firstName, lastName, profileUrl } = member?.associate;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  const memberTypeColorMap = {
    activeAmbassador: theme.primaryButtonBackgroundColor,
    activePreferred: theme.customerAvatarAccent,
    activeRetail: theme.retailAvatarAccent,
    warning: theme.warningAvatarAccent,
    terminated: theme.alertAvatarAccent,
  };

  const [label, color] = filterMemberByStatusAndType(
    member,
    memberTypeColorMap,
  );

  const properlyCasedName = capitalizeFirstLetterOfEachWord(
    `${firstName} ${lastName}`,
  );

  return (
    <>
      <View>
        {profileUrl ? (
          <ThumbnailImage source={{ uri: profileUrl }} />
        ) : (
          <DefaultThumbnailBackground>
            <H4Book>{initials.toUpperCase()}</H4Book>
          </DefaultThumbnailBackground>
        )}
        {showAccentColor && (
          <LevelIndicatorContainer>
            <LevelIndicator color={color}>
              {level ? (
                <LevelLabel
                  style={{
                    color:
                      color === theme.warningAvatarAccent
                        ? theme.backgroundColor
                        : theme.primaryTextColor,
                  }}
                >
                  {level}
                </LevelLabel>
              ) : null}
            </LevelIndicator>
          </LevelIndicatorContainer>
        )}
      </View>
      <NameAndRankContainer>
        <H5>{properlyCasedName}</H5>
        <Flexbox direction="row">
          <H6>{label}</H6>
        </Flexbox>
      </NameAndRankContainer>
    </>
  );
};

DownlineProfileInfo.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
  showAccentColor: PropTypes.bool,
};

export default DownlineProfileInfo;
