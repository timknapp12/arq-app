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
import FfmIcon from '../../../assets/icons/FFMIcon.svg';
import ChatIcon from '../../../assets/icons/ChatIcon.svg';
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

const TextWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 8px;
`;

const ServicesView = ({ closeMenus, isMenuOpen }) => {
  const { theme } = useContext(AppContext);
  const { enabledMarket, userMarket } = useContext(LoginContext);

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

  const goToFfmForm = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync(
      'https://docs.google.com/forms/d/e/1FAIpQLSf9xokMK-dsYSZT__oKmFD3bCk-8d7FK2g-X7AiTXmfCMX2DQ/viewform',
    );
    closeMenus();
  };

  const goToLiveChat = () => {
    if (isMenuOpen && Platform.OS === 'android') {
      return;
    }
    WebBrowser.openBrowserAsync('https://info.qsciences.com/chat');
    closeMenus();
  };

  const iconStyle = {
    height: 48,
    width: 48,
    color: theme.primaryTextColor,
    alignSelf: 'center',
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
                  <EnrollmentIcon style={iconStyle} />
                  <TextWrapper>
                    <H4Book>{Localized('Enrollment Links')}</H4Book>
                    <H6Book>
                      {Localized(
                        'Growing your team? Everything they need to enroll is right here',
                      )}
                    </H6Book>
                  </TextWrapper>
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
                  <ShopQIcon style={iconStyle} />
                  <TextWrapper>
                    <H4Book>{Localized('Shopping')}</H4Book>
                    <H6Book>
                      {Localized(
                        'Shop the Q product suite and manage your Subscription on qsciences.com',
                      )}
                    </H6Book>
                  </TextWrapper>
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
              <TextWrapper>
                <H4Book>{Localized('MyQFit')}</H4Book>
                <H6Book>
                  {Localized(
                    'Fitness and nutrition, tools & resources, support & community',
                  )}
                </H6Book>
              </TextWrapper>
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
              <OnboardingIcon style={iconStyle} />
              <TextWrapper>
                <H4Book>{Localized('MyQFit Ambassador Onboarding')}</H4Book>
                <H6Book>
                  {Localized(
                    'Start your fitness journey now with the MyQFIT App',
                  )}
                </H6Book>
              </TextWrapper>
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
              <RequestChallengeIcon style={iconStyle} />
              <TextWrapper>
                <H4Book>{Localized('MyQFit Challenge Request')}</H4Book>
                <H6Book>
                  {Localized(
                    'Take your fitness and your business to the next level as a team ',
                  )}
                </H6Book>
              </TextWrapper>
            </Row>
          </Card>
        </TouchableOpacity>

        {userMarket?.countryCode.toLowerCase() === 'us' && (
          <TouchableOpacity
            activeOpacity={isMenuOpen ? 1 : 0.2}
            onPress={() => {
              goToFfmForm();
              Analytics.logEvent('open_ffm_form_in_services');
            }}
          >
            <Card>
              <Row>
                <FfmIcon style={iconStyle} />
                <TextWrapper>
                  <H4Book>{Localized('FFM Coaching Sign-Up')}</H4Book>
                  <H6Book>
                    {Localized(
                      'Get FREE financial advice from the Financial Freedom Movement experts',
                    )}
                  </H6Book>
                </TextWrapper>
              </Row>
            </Card>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={isMenuOpen ? 1 : 0.2}
          onPress={() => {
            goToLiveChat();
            Analytics.logEvent('open_live_chat_in_services');
          }}
        >
          <Card>
            <Row>
              <ChatIcon style={iconStyle} />
              <TextWrapper>
                <H4Book>{Localized('Live Chat')}</H4Book>
                <H6Book>
                  {Localized(
                    'Chat with an Ambassador Success agent in real-time',
                  )}
                </H6Book>
              </TextWrapper>
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
