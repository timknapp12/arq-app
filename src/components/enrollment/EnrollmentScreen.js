import React, { useState } from 'react';
// import PropTypes from 'prop-types';
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

  return (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      <Flexbox padding={12}>
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
        <EnrollmentScreenCard
          text={`${Localized(
            'Have a prospect scan the QR code below to open the enrollment form on their device',
          )}:`}
        >
          <SecondaryButton>SEND TO PROSPECT</SecondaryButton>
        </EnrollmentScreenCard>
        <EnrollmentScreenCard
          text={`${Localized(
            'Send the enrollment link to a person in your prospects list',
          )}:`}
        >
          <SecondaryButton>SEND TO PROSPECT</SecondaryButton>
        </EnrollmentScreenCard>
        <EnrollmentScreenCard
          text={`${Localized(
            'Open the enrollment form in Shop Q so you can help your prospect enroll',
          )}:`}
        >
          <SecondaryButton>SEND TO PROSPECT</SecondaryButton>
        </EnrollmentScreenCard>
        <EnrollmentScreenCard
          text={`${Localized(
            'Copy the link so that you can share it with a prospect via text message',
          )}:`}
        >
          <SecondaryButton>SEND TO PROSPECT</SecondaryButton>
        </EnrollmentScreenCard>
      </Flexbox>
    </ScreenContainer>
  );
};

export default EnrollmentScreen;
