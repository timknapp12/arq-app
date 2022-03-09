import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { ScrollView, Linking, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import {
  ScreenContainer,
  SecondaryButton,
  RadioButton,
  Flexbox,
} from '../common';
import EnrollmentScreenCard from './EnrollmentScreenCard';
import { Localized } from '../../translations/Localized';

const EnrollmentScreen = () => {
  const [selectedOption, setSelectedOption] = useState('preferred');

  const genericUrl =
    selectedOption === 'preferred'
      ? 'https://www.google.com'
      : 'https://www.qsciences.com';

  const title =
    selectedOption === 'preferred'
      ? 'Preferred Customer Enrollment'
      : 'Retail Customer Enrollment';

  const navigation = useNavigation();
  const onSend = () => {
    navigation.navigate('Prospects Stack', {
      screen: 'Prospects Screen',
      params: {
        title,
        url: genericUrl,
        prospectLinkIsNeeded: false,
        fromEnrollmentScreen: true,
      },
    });
  };

  return (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
        }}
      >
        <Flexbox>
          <Flexbox align="flex-start">
            <RadioButton
              label={Localized('Preferred Customer')}
              isSelected={selectedOption === 'preferred'}
              onPress={() => setSelectedOption('preferred')}
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
            <QRCode size={120} value={genericUrl} />
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
            <SecondaryButton onPress={() => Linking.openURL(genericUrl)}>
              {Localized('Open in Shop Q').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
          <EnrollmentScreenCard
            text={`${Localized(
              'Share the link with a prospect via text message',
            )}:`}
          >
            <SecondaryButton
              onPress={() => Share.share({ message: genericUrl })}
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
