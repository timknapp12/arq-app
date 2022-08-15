import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Share } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  ScreenContainer,
  SecondaryButton,
  RadioButton,
  Flexbox,
  H5Secondary,
} from '../common';
import EnrollmentScreenCard from './EnrollmentScreenCard';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';

const EnrollmentScreen = () => {
  const { shopQUrl, userProfile } = useContext(LoginContext);
  const slug = userProfile?.associateSlugs?.[0]?.slug;
  const [selectedOption, setSelectedOption] = useState('ambassador');

  const url = `${shopQUrl}${slug}?type${encodeURIComponent(
    `=`,
  )}${selectedOption}`;

  useEffect(() => {
    Analytics.logEvent('Enrollment_Screen_visited', {
      screen: 'Enrollment Screen',
      purpose: 'User navigated to Enrollment Screen',
    });
  }, []);

  const optionTitleMap = {
    pc: 'Preferred Customer Enrollment',
    retail: 'Retail Customer Enrollment',
    ambassador: 'Ambassador Enrollments',
  };

  const title = optionTitleMap[selectedOption];

  const navigation = useNavigation();
  const onSend = () => {
    Analytics.logEvent(`send_${selectedOption}_enrlmnt_url_to_prospect`);
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Screen',
      params: {
        title,
        url,
        prospectLinkIsNeeded: false,
        fromEnrollmentScreen: true,
      },
    });
  };

  return (
    <ScreenContainer
      style={{ justifyContent: 'flex-start', paddingTop: 0, paddingBottom: 0 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 100,
        }}
      >
        <H5Secondary style={{ textAlign: 'center' }}>
          {Localized('This feature is currently only supported in the USA')}
        </H5Secondary>
        <Flexbox>
          <Flexbox align="flex-start">
            <RadioButton
              label={Localized('Ambassador')}
              isSelected={selectedOption === 'ambassador'}
              onPress={() => setSelectedOption('ambassador')}
            />
            <RadioButton
              label={Localized('Preferred Customer')}
              isSelected={selectedOption === 'pc'}
              onPress={() => setSelectedOption('pc')}
            />
            <RadioButton
              label={Localized('Retail Customer')}
              isSelected={selectedOption === 'retail'}
              onPress={() => setSelectedOption('retail')}
            />
          </Flexbox>
          <EnrollmentScreenCard
            text={`${Localized(
              'Have a prospect scan the QR code below to open the enrollment form on their device',
            )}:`}
          >
            <QRCode size={120} value={url} />
          </EnrollmentScreenCard>
          <EnrollmentScreenCard
            text={`${Localized(
              'Send the enrollment link to a person in your prospects list',
            )}:`}
          >
            <SecondaryButton onPress={onSend}>
              {Localized('Send to Prospect').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
          <EnrollmentScreenCard
            text={`${Localized(
              'Open the enrollment form in Shop Q so you can help your prospect enroll',
            )}:`}
          >
            <SecondaryButton
              onPress={() => {
                WebBrowser.openBrowserAsync(url);
                Analytics.logEvent(
                  `Open_${selectedOption}_enrollment_link_in_shopQ`,
                );
              }}
            >
              {Localized('Open in Shop Q').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
          <EnrollmentScreenCard
            text={`${Localized(
              'Share the link with a prospect via text message',
            )}:`}
          >
            <SecondaryButton
              onPress={() => {
                Share.share({ message: url });
                Analytics.logEvent(
                  `Share_${selectedOption}_enrollment_link_button_tapped`,
                );
              }}
            >
              {Localized('Share Link').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
        </Flexbox>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EnrollmentScreen;
