import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Flexbox, H4, H4Secondary } from '../../common';
import { Localized } from '../../../translations/Localized';

const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 2px;
`;

const InvisibleUnderline = styled.View`
  height: 2px;
`;

const RankTabs = ({ selectedTab, setSelectedTab, closeMenus }) => {
  return (
    <Flexbox accessibilityLabel="Rank Tabs">
      <Flexbox justify="center" direction="row">
        <TouchableOpacity
          style={{ marginEnd: 8 }}
          onPress={() => {
            setSelectedTab('teamRank');
            closeMenus();
          }}
        >
          {selectedTab === 'teamRank' ? (
            <>
              <H4>{Localized('Team Rank')}</H4>
              <Underline />
            </>
          ) : (
            <>
              <H4Secondary>{Localized('Team Rank')}</H4Secondary>
              <InvisibleUnderline />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginStart: 8 }}
          onPress={() => {
            setSelectedTab('customerRank');
            closeMenus();
          }}
        >
          {selectedTab === 'customerRank' ? (
            <>
              <H4>{Localized('Customer Rank')}</H4>
              <Underline />
            </>
          ) : (
            <>
              <H4Secondary>{Localized('Customer Rank')}</H4Secondary>
              <InvisibleUnderline />
            </>
          )}
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

RankTabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  closeMenus: PropTypes.func.isRequired,
};

export default RankTabs;
