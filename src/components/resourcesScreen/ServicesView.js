import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Linking, Platform } from 'react-native';
import BackOfficeIcon from '../../../assets/icons/back-office-icon.svg';
import EnrollmentIcon from '../../../assets/icons/enrollment-icon.svg';
import { H4Book, H6Book, MainScrollView } from '../common';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';

const Card = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const ServicesView = ({ closeMenus, isMenuOpen }) => {
  const { theme } = useContext(AppContext);
  const { displayNotifications, setDisplayNotifications } =
    useContext(LoginContext);

  // on android, the touch events of the menu buttons will bleed through and activate the touches on the cards underneath. This func will prevent that
  const onPress = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    // don't allow navigation if notifications is open
    if (displayNotifications && Platform.OS === 'android') {
      return;
    }
    // close notifications window if it is open instead of navigating
    if (displayNotifications && Platform.OS === 'ios') {
      return setDisplayNotifications(false);
    }
    if (!displayNotifications) {
      Linking.openURL('https://office2.myqsciences.com/#/Login');
    }
    closeMenus();
  };
  return (
    <MainScrollView>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          activeOpacity={isMenuOpen || displayNotifications ? 1 : 0.2}
          onPress={onPress}
        >
          <Card>
            <Row>
              <BackOfficeIcon
                style={{
                  height: 48,
                  width: 48,
                  color: theme.primaryTextColor,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginStart: 8,
                }}
              >
                <H4Book>{Localized('Back Office')}</H4Book>
                <H6Book>
                  {Localized(
                    'Access everything you need to build your business on the go.',
                  )}
                </H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={isMenuOpen || displayNotifications ? 1 : 0.2}
          onPress={onPress}
        >
          <Card>
            <Row>
              <EnrollmentIcon
                style={{
                  height: 48,
                  width: 48,
                  color: theme.primaryTextColor,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginStart: 8,
                }}
              >
                <H4Book>{Localized('Ambassador Enrollments')}</H4Book>
                <H6Book>
                  {Localized('Help people enroll with Q Sciences today.')}
                </H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>
      </View>
    </MainScrollView>
  );
};

ServicesView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default ServicesView;
