import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Flexbox, H2Black, H4Book, H5, H6 } from '../../common';
import RankIcon from '../visualTree/RankIcon';
import {
  CardContainer,
  StandingsContainer,
  NameAndRankIconContainer,
  CountContainer,
} from './leaderbaoard.styles';
import {
  ThumbnailImage,
  DefaultThumbnailBackground,
} from '../myTeam/myTeamCard.styles';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';

const StandingsCard = ({ member, closeAllMenus, selectedTab }) => {
  const { firstName, lastName, profileUrl } = member?.associate;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  return (
    <CardContainer onPress={closeAllMenus} activeOpacity={1}>
      <Flexbox direction="row" justity="flex-start" style={{ flex: 1 }}>
        <Flexbox
          height="100%"
          width="60px"
          align="flex-start"
          justity="space-between"
        >
          <StandingsContainer fullHeight={selectedTab === 'ENTIRE_COMPANY'}>
            <H2Black>{member?.displayOrder}</H2Black>
          </StandingsContainer>
          {selectedTab === 'MY_TEAM' && (
            <CountContainer>
              <H6>{member?.count}</H6>
            </CountContainer>
          )}
        </Flexbox>

        <View style={{ flex: 1, padding: 6, flexDirection: 'row' }}>
          {profileUrl ? (
            <ThumbnailImage source={{ uri: profileUrl }} />
          ) : (
            <DefaultThumbnailBackground>
              <H4Book>{initials.toUpperCase()}</H4Book>
            </DefaultThumbnailBackground>
          )}
          <NameAndRankIconContainer>
            <H5 style={{ flex: 1 }}>{properlyCaseName(firstName, lastName)}</H5>
            {selectedTab === 'MY_TEAM' && (
              <>
                <View style={{ width: 40 }}>
                  <RankIcon rankName={member?.rank?.rankName ?? 'Ambassador'} />
                </View>
                <View
                  style={{
                    width: 40,
                    alignItems: 'center',
                  }}
                >
                  <RankIcon
                    rankName={
                      member?.customerSalesRank?.rankName ?? 'Ambassador'
                    }
                  />
                </View>
              </>
            )}
          </NameAndRankIconContainer>
        </View>
      </Flexbox>
    </CardContainer>
  );
};

StandingsCard.propTypes = {
  member: PropTypes.object.isRequired,
  closeAllMenus: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default StandingsCard;
