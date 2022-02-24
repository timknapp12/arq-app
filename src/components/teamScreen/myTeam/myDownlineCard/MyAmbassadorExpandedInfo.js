import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6, H6Secondary } from '../../../common';
import OvRankBarChartContainer from './OvRankBarChartContainer';
import CvRankBarChartContainer from './CvRankBarChartContainer';
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

  const [selectedTab, setSelectedTab] = useState('ovRank');

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
              setSelectedTab('ovRank');
              closeAllMenus();
            }}
          >
            {selectedTab === 'ovRank' ? (
              <>
                <H6>{Localized('OV Rank')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('OV Rank')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedTab('cvRank');
              closeAllMenus();
            }}
          >
            {selectedTab === 'cvRank' ? (
              <>
                <H6>{Localized('CV Rank')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('CV Rank')}</H6Secondary>
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
          {selectedTab === 'ovRank' && (
            <OvRankBarChartContainer member={member} />
          )}
          {selectedTab === 'cvRank' && (
            <CvRankBarChartContainer level={level} member={member} />
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
