import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const EnrollmentScreen = ({ route }) => {
  const emailAddress = route?.params?.emailAddress;

  const [selectedOption, setSelectedOption] = useState('pc');

  // TODO - update url when back end has new enrollment key instead of email address
  const url = `https://shopq.qsciences.com?associate_type=${selectedOption}%24referred_by_email=${emailAddress}`;

  const title =
    selectedOption === 'pc'
      ? 'Preferred Customer Enrollment'
      : 'Retail Customer Enrollment';

  const navigation = useNavigation();
  const onSend = () => {
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
            <SecondaryButton onPress={() => Linking.openURL(url)}>
              {Localized('Open in Shop Q').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
          <EnrollmentScreenCard
            text={`${Localized(
              'Share the link with a prospect via text message',
            )}:`}
          >
            <SecondaryButton onPress={() => Share.share({ message: url })}>
              {Localized('Share Link').toUpperCase()}
            </SecondaryButton>
          </EnrollmentScreenCard>
        </Flexbox>
      </ScrollView>
    </ScreenContainer>
  );
};

EnrollmentScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EnrollmentScreen;
