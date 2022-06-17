import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
} from 'react-native';
import { useQuery } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import { Flexbox, H5, LoadingSpinner, H6Secondary } from '../../common';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import InfoIcon from '../../../../assets/icons/InfoIcon.svg';
import AppContext from '../../../contexts/AppContext';
import LeaderboardFilterModal from './LeaderboardFilterModal';
import LeaderboardTabs from './LeaderboardTabs';
import RankLegend from './RankLegend';
import { LEADERBOARD } from '../../../graphql/queries';
import StandingsCard from './StandingsCard';
import { maxWidth } from '../../../styles/constants';
import { Localized } from '../../../translations/Localized';

const LeaderboardView = ({ closeMenus, ...props }) => {
  const { theme } = useContext(AppContext);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isRankLegendOpen, setIsRankLegendOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('ENTIRE_COMPANY');
  const [selectedLeaderboardMonth, setSelectedLeaderboardMonth] =
    useState('CURRENT');
  const [selectedLeaderboardType, setSelectedLeaderboardType] = useState(
    'AMBASSADOR_ENROLLMENT',
  );
  const [selectedRankId, setSelectedRankId] = useState('0');

  const leaderboardTypeMap = {
    AMBASSADOR_ENROLLMENT: Localized('Ambassador Enrollments'),
    PC_ENROLLMENT: Localized('PC Enrollments'),
    EVENT_SALES: Localized('Event Tickets'),
  };

  const variables = {
    leaderboardMonth: selectedLeaderboardMonth,
    leaderboardScope: selectedTab,
    leaderboardType: selectedLeaderboardType,
    // we need to pass values to the picker as a string, but need to convert it to a number for Q Services, and value of 0 for "ALL" in the filter needs to be converted to 1 for ambassador
    rankId: selectedRankId === '0' ? 1 : Number(selectedRankId),
  };

  const logAnalytics = (month, scope, type, rankId) => {
    Analytics.logEvent(`ldrboard_by_month_${month}`);
    Analytics.logEvent(`ldrboard_by_scope_${scope}`);
    Analytics.logEvent(`ldrboard_by_type_${type}`);
    Analytics.logEvent(`ldrboard_by_rankId_${rankId}`);
  };

  const { data, loading } = useQuery(LEADERBOARD, {
    variables: variables,
    onError: (err) => console.log('err in leaderboard', err),
    onCompleted: () =>
      logAnalytics(
        selectedLeaderboardMonth,
        selectedTab,
        selectedLeaderboardType,
        selectedRankId,
      ),
  });

  // this will close from the parent 1- the main side menu, 2- the notifications dropdown, 3- expanded button options from the navbar add button
  const closeAllMenus = () => {
    closeMenus();
    isRankLegendOpen && fadeOut();
  };

  const fadeAnim = useRef(new Animated.Value(-500)).current;

  const fadeIn = () => {
    setIsRankLegendOpen(true);
    closeAllMenus();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsRankLegendOpen(false));
  };

  const handleOnEndReached = () =>
    Analytics.logEvent('scrolled_to_bottom_of_leaderboard');

  const placeCountLabel =
    selectedTab === 'MY_TEAM'
      ? `${Localized('Place')}/${Localized('Count')}`
      : Localized('Place');

  const renderItem = ({ item }) => (
    <StandingsCard
      member={item}
      closeAllMenus={closeAllMenus}
      selectedTab={selectedTab}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={() => closeAllMenus()}>
      <Flexbox
        align="center"
        justify="flex-start"
        width="95%"
        height="100%"
        padding={4}
        style={{ zIndex: -1, maxWidth }}
        {...props}
      >
        <H5>{`${leaderboardTypeMap[selectedLeaderboardType]} (${Localized(
          selectedLeaderboardMonth === 'CURRENT' ? 'This month' : 'Last month',
        ).toLowerCase()})`}</H5>
        <Flexbox direction="row" justify="space-around">
          <TouchableOpacity
            style={{ padding: 6, paddingEnd: 12 }}
            onPress={() => setIsFilterMenuOpen(true)}
          >
            <FilterIcon
              style={{
                height: 30,
                width: 30,
                color: theme.primaryTextColor,
              }}
            />
          </TouchableOpacity>

          <LeaderboardTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            closeAllMenus={closeAllMenus}
          />

          {selectedTab === 'MY_TEAM' ? (
            <TouchableOpacity
              style={{ width: 42, alignItems: 'center' }}
              onPress={() => {
                isRankLegendOpen ? fadeOut() : fadeIn();
                !isRankLegendOpen && Analytics.logEvent('opened_rank_legend');
              }}
            >
              <InfoIcon
                style={{
                  color: theme.secondaryTextColor,
                  height: 24,
                  width: 24,
                }}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 42 }} />
          )}
          <RankLegend fadeAnim={fadeAnim} />
        </Flexbox>
        <Flexbox direction="row" padding={4} style={{ zIndex: -1 }}>
          <H6Secondary style={{ flex: 1 }}>{placeCountLabel}</H6Secondary>
          <H6Secondary style={{ flex: 1 }}>{Localized('Name')}</H6Secondary>
          {selectedTab === 'MY_TEAM' ? (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ marginEnd: 8 }}>
                <H6Secondary>{Localized('OV Rank')}</H6Secondary>
              </View>
              <View>
                <H6Secondary>{Localized('CV Rank')}</H6Secondary>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </Flexbox>
        {loading ? (
          <LoadingSpinner style={{ marginTop: 10 }} size="large" />
        ) : (
          <Flexbox
            width="100%"
            style={{ zIndex: -1, marginBottom: 50, paddingBottom: 30 }}
          >
            <FlatList
              style={{ width: '100%', marginBottom: 90 }}
              data={data?.leaderboard?.items}
              renderItem={renderItem}
              keyExtractor={(item) => item?.associate?.associateId?.toString()}
              onScroll={fadeOut}
              onEndReached={handleOnEndReached}
            />
          </Flexbox>
        )}
        {isFilterMenuOpen && (
          <LeaderboardFilterModal
            visible={isFilterMenuOpen}
            onClose={() => setIsFilterMenuOpen(false)}
            selectedLeaderboardMonth={selectedLeaderboardMonth}
            setSelectedLeaderboardMonth={setSelectedLeaderboardMonth}
            selectedLeaderboardType={selectedLeaderboardType}
            setSelectedLeaderboardType={setSelectedLeaderboardType}
            selectedRankId={selectedRankId}
            setSelectedRankId={setSelectedRankId}
          />
        )}
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

LeaderboardView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
};

export default LeaderboardView;
