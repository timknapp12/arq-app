import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6, H6Secondary } from '../../../common';
import TeamRankBarChartContainer from './TeamRankBarChartContainer';
import CustomerRankBarChartContainer from './CustomerRankBarChartContainer';
import OrdersContainer from '../OrdersContainer';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { Localized } from '../../../../translations/Localized';
import {
  Underline,
  InvisibleUnderline,
  BarChartAndOrdersContainer,
} from '../myTeamCard.styles';

const MyAmbassadorExpandedInfo = ({ member, level }) => {
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const [selectedTab, setSelectedTab] = useState('teamRank');

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <Flexbox accessibilityLabel="Member Details">
        <Flexbox
          justify="center"
          direction="row"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={{ marginEnd: 16 }}
            onPress={() => {
              setSelectedTab('teamRank');
              closeAllMenus();
            }}
          >
            {selectedTab === 'teamRank' ? (
              <>
                <H6>{Localized('Team Rank')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('Team Rank')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedTab('customerRank');
              closeAllMenus();
            }}
          >
            {selectedTab === 'customerRank' ? (
              <>
                <H6>{Localized('Customer Rank')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('Customer Rank')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginStart: 16 }}
            onPress={() => {
              setSelectedTab('orders');
              closeAllMenus();
            }}
          >
            {selectedTab === 'orders' ? (
              <>
                <H6>{Localized('Orders')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('Orders')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>
        </Flexbox>
        <BarChartAndOrdersContainer>
          {selectedTab === 'teamRank' && (
            <TeamRankBarChartContainer member={member} />
          )}
          {selectedTab === 'customerRank' && (
            <CustomerRankBarChartContainer level={level} member={member} />
          )}
          {selectedTab === 'orders' && (
            <OrdersContainer level={level} member={member} />
          )}
        </BarChartAndOrdersContainer>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

MyAmbassadorExpandedInfo.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
};

export default MyAmbassadorExpandedInfo;
