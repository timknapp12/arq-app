import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import * as Analytics from 'expo-firebase-analytics';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6, H6Secondary } from '../../../common';
import OrdersContainer from '../OrdersContainer';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import MyDownlineProfileCard from './MyDownlineProfileCard';
import { Localized } from '../../../../translations/Localized';
import { Underline, InvisibleUnderline } from '../myTeamCard.styles';

const MyCustomerExpandedInfo = ({ level, member }) => {
  const { closeAllMenus } = useContext(MyTeamViewContext);
  const [selectedTab, setSelectedTab] = useState('orders');

  useEffect(() => {
    Analytics.logEvent(`viewed_${selectedTab}_of_downline_amb`);
  }, [selectedTab]);

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

          <TouchableOpacity
            onPress={() => {
              setSelectedTab('profile');
              closeAllMenus();
            }}
          >
            {selectedTab === 'profile' ? (
              <>
                <H6>{Localized('Profile')}</H6>
                <Underline />
              </>
            ) : (
              <>
                <H6Secondary>{Localized('Profile')}</H6Secondary>
                <InvisibleUnderline />
              </>
            )}
          </TouchableOpacity>
        </Flexbox>
        {selectedTab === 'orders' && (
          <OrdersContainer level={level} member={member} />
        )}
        {selectedTab === 'profile' && (
          <MyDownlineProfileCard associateId={member?.associate?.associateId} />
        )}
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

MyCustomerExpandedInfo.propTypes = {
  level: PropTypes.number.isRequired,
  member: PropTypes.object.isRequired,
};

export default MyCustomerExpandedInfo;
