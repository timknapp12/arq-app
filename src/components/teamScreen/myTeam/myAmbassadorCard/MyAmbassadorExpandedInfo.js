import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6, H6Secondary } from '../../../common';
import MyAmbassadorDonutsContainer from './MyAmbassadorDonutsContainer';
import MyAmbassadorOrdersContainer from './MyAmbassadorOrdersContainer';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { Localized } from '../../../../translations/Localized';
import {
  Underline,
  InvisibleUnderline,
  DonutAndOrdersContainer,
} from '../myTeamCard.styles';

const MyAmbassadorExpandedInfo = ({ member }) => {
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
        <DonutAndOrdersContainer>
          {selectedTab === 'dashboard' ? (
            <MyAmbassadorDonutsContainer member={member} />
          ) : (
            <MyAmbassadorOrdersContainer orders={[]} />
          )}
        </DonutAndOrdersContainer>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

MyAmbassadorExpandedInfo.propTypes = { member: PropTypes.object.isRequired };

export default MyAmbassadorExpandedInfo;
