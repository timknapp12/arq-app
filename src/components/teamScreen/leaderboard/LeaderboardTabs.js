import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Flexbox, H4, H4Secondary } from '../../common';
import { Localized } from '../../../translations/Localized';
import { Underline, InvisibleUnderline } from './leaderbaoard.styles';

const LeaderboardTabs = ({ selectedTab, setSelectedTab, closeAllMenus }) => {
  return (
    <Flexbox accessibilityLabel="Leaderboard Tabs">
      <Flexbox justify="center" direction="row">
        <TouchableOpacity
          style={{ marginEnd: 8 }}
          onPress={() => {
            setSelectedTab('company');
            closeAllMenus();
          }}
        >
          {selectedTab === 'company' ? (
            <>
              <H4>{Localized('Company')}</H4>
              <Underline />
            </>
          ) : (
            <>
              <H4Secondary>{Localized('Company')}</H4Secondary>
              <InvisibleUnderline />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginStart: 8 }}
          onPress={() => {
            setSelectedTab('team');
            closeAllMenus();
          }}
        >
          {selectedTab === 'team' ? (
            <>
              <H4>{Localized('Team')}</H4>
              <Underline />
            </>
          ) : (
            <>
              <H4Secondary>{Localized('Team')}</H4Secondary>
              <InvisibleUnderline />
            </>
          )}
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

LeaderboardTabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  closeAllMenus: PropTypes.func.isRequired,
};

export default LeaderboardTabs;
