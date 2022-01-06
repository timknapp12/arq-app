import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6, H6Secondary } from '../../../common';
import MyAmbassadorBarChartContainer from './MyAmbassadorBarChartContainer';
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

  const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <Flexbox accessibilityLabel="Member Details">
        <Flexbox
          justify="center"
          direction="row"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={{ marginEnd: 8 }}
            onPress={() => {
              setSelectedTab('dashboard');
              closeAllMenus();
            }}
          >
            {selectedTab === 'dashboard' ? (
              <>
                <H6>{Localized('Dashboard')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('Dashboard')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginStart: 8 }}
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
          {selectedTab === 'dashboard' ? (
            <MyAmbassadorBarChartContainer member={member} />
          ) : (
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
