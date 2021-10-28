import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H6 } from '../../../common';
import MyAmbassadorDonutsContainer from './MyAmbassadorDonutsContainer';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { Localized } from '../../../../translations/Localized';
import { Underline, InvisibleUnderline } from './myAmbassadorCard.styles';

const MyAmbassadorExpandedInfo = ({ member }) => {
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const [selectedDetail, setSelectedDetail] = useState('dashboard');

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
            onPress={() => setSelectedDetail('dashboard')}
          >
            <H6>{Localized('Dashboard')}</H6>
            {selectedDetail === 'dashboard' ? (
              <Underline />
            ) : (
              <InvisibleUnderline />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginStart: 8 }}
            onPress={() => setSelectedDetail('orders')}
          >
            <H6>{Localized('Orders')}</H6>
            {selectedDetail === 'orders' ? (
              <Underline />
            ) : (
              <InvisibleUnderline />
            )}
          </TouchableOpacity>
        </Flexbox>
        {selectedDetail === 'dashboard' ? (
          <MyAmbassadorDonutsContainer member={member} />
        ) : null}
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

MyAmbassadorExpandedInfo.propTypes = { member: PropTypes.object.isRequired };

export default MyAmbassadorExpandedInfo;
