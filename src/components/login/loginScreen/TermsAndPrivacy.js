import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H4, Flexbox, H5Secondary } from '../../common';
import { Localized } from '../../../translations/Localized';
import Constants from 'expo-constants';

const termsOfServiceUrl =
  'https://firebasestorage.googleapis.com/v0/b/q-innovation-prod.appspot.com/o/legal%2F%5BQ%20Sciences%5D%20Terms%20of%20Service.pdf?alt=media&token=87c7d801-7b50-4e7b-a712-797a81536089';

const privacyPolicyUrl =
  'https://firebasestorage.googleapis.com/v0/b/q-innovation-prod.appspot.com/o/legal%2FQSI%20Holding%20Global%20Privacy%20Policy-FINAL-8.11.22.pdf?alt=media&token=e30fad87-2382-41ee-8af5-1269cef8b779';

const TermsAndPrivacy = ({ openTerms, openPrivacy }) => {
  return (
    <Flexbox justify="flex-start">
      <Flexbox
        accessibilityLabel="Terms Privacy Data"
        style={{ marginBottom: 5 }}
        justify="center"
        direction="row"
      >
        <TouchableOpacity
          onPress={() => openTerms(termsOfServiceUrl)}
          testID="terms-button"
        >
          <H4>{Localized('Terms')}</H4>
        </TouchableOpacity>
        <H4 style={{ marginStart: 8 }}>|</H4>
        <TouchableOpacity
          onPress={() => openPrivacy(privacyPolicyUrl)}
          testID="privacy-button"
          style={{ marginStart: 8 }}
        >
          <H4>{Localized('Privacy')}</H4>
        </TouchableOpacity>
      </Flexbox>
      <H5Secondary>{`ARQ Version: ${Constants.expoConfig.version}`}</H5Secondary>
    </Flexbox>
  );
};

TermsAndPrivacy.propTypes = {
  openTerms: PropTypes.func,
  openPrivacy: PropTypes.func,
};

export default TermsAndPrivacy;
