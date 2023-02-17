import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Analytics from 'expo-firebase-analytics';
import { useNavigation } from '@react-navigation/native';
import EnrollmentIcon from '../../../assets/icons/EnrollmentIcon.svg';
import ShopQIcon from '../../../assets/icons/ShopQIcon.svg';
import MyQFitIcon from '../../../assets/icons/MyQFITIcon.svg';
import OnboardingIcon from '../../../assets/icons/OnboardingIcon.svg';
import RequestChallengeIcon from '../../../assets/icons/RequestAChallengeIcon.svg';
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
  const { enabledMarket } = useContext(LoginContext);

  const navigation = useNavigation();
  const goToEnrollmentScreen = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    navigation.navigate('Enrollment Screen');
    closeMenus();
  };

  const goToShopQ = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync('https://qsciences.com');
    closeMenus();
  };

  const goToMyQFit = () => {
    // on android, the touch events of the menu buttons will bleed through and activate the touches on the cards underneath. This func will prevent that
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync('https://myqfit.com');
    closeMenus();
  };

  const goToChallenge = () => {
    // on android, the touch events of the menu buttons will bleed through and activate the touches on the cards underneath. This func will prevent that
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync('https://myqfit.com/challenge-request/');
    closeMenus();
  };

  const goToOnboarding = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync('https://myqfit.com/onboarding/');
    closeMenus();
  };

  return (
    <MainScrollView>
      <View style={{ width: '100%' }}>
        {enabledMarket && (
          <>
            <TouchableOpacity
              activeOpacity={isMenuOpen ? 1 : 0.2}
              onPress={() => {
                goToEnrollmentScreen();
                Analytics.logEvent('go_to_enrollment_from_services');
              }}
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
                      {Localized('Help people enroll with Q Sciences today')}
                    </H6Book>
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={isMenuOpen ? 1 : 0.2}
              onPress={() => {
                goToShopQ();
                Analytics.logEvent('go_to_shop_q');
              }}
            >
              <Card>
                <Row>
                  <ShopQIcon
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
                    <H4Book>{Localized('Shopping')}</H4Book>
                    <H6Book>
                      {Localized('Shop products and manage your subscription')}
                    </H6Book>
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          activeOpacity={isMenuOpen ? 1 : 0.2}
          onPress={() => {
            goToMyQFit();
            Analytics.logEvent('open_link_to_myQFit_in_services');
          }}
        >
          <Card>
            <Row>
              <MyQFitIcon
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
                <H4Book>{Localized('MyQFit')}</H4Book>
                <H6Book>
                  {Localized(
                    'Fitness and nutrition, tools & resources, support & community',
                  )}
                </H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={isMenuOpen ? 1 : 0.2}
          onPress={() => {
            goToOnboarding();
            Analytics.logEvent('open_myQFit_onboarding_in_services');
          }}
        >
          <Card>
            <Row>
              <OnboardingIcon
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
                <H4Book>{Localized('MyQFit Ambassador Onboarding')}</H4Book>
                <H6Book>{Localized('Join the MyQFIT app')}</H6Book>
              </View>
            </Row>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={isMenuOpen ? 1 : 0.2}
          onPress={() => {
            goToChallenge();
            Analytics.logEvent('open_myQFit_challenge_in_services');
          }}
        >
          <Card>
            <Row>
              <RequestChallengeIcon
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
                <H4Book>{Localized('MyQFit Challenge Request')}</H4Book>
                <H6Book>
                  {Localized(
                    'Request a custom challenge for your team and customers',
                  )}
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
