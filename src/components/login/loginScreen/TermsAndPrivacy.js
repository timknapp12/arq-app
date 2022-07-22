import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H4, Flexbox, H5Secondary } from '../../common';
import { Localized } from '../../../translations/Localized';
import config from '../../../../app.config';

const termsOfServiceUrl =
  'https://firebasestorage.googleapis.com/v0/b/q-innovation-prod.appspot.com/o/legal%2F%5BQ%20Sciences%5D%20Terms%20of%20Service.pdf?alt=media&token=87c7d801-7b50-4e7b-a712-797a81536089';

const privacyPolicyUrl =
  'https://firebasestorage.googleapis.com/v0/b/q-innovation-prod.appspot.com/o/legal%2F%5BQ%20Sciences%5D%20Privacy%20Policy.pdf?alt=media&token=748056f7-c833-428e-bd0c-44e60954e71b';

const TermsAndPrivacy = ({ navigation }) => {
  const openTerms = () =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Terms').toUpperCase(),
        url: termsOfServiceUrl,
        contentType: 'pdf',
      },
    });
  const openPrivacy = () =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Privacy').toUpperCase(),
        url: privacyPolicyUrl,
        contentType: 'pdf',
      },
    });

  return (
    <Flexbox justify="flex-start">
      <Flexbox
        accessibilityLabel="Terms Privacy Data"
        style={{ marginBottom: 5 }}
        justify="center"
        direction="row">
        <TouchableOpacity onPress={openTerms} testID="terms-button">
          <H4>{Localized('Terms')}</H4>
        </TouchableOpacity>
        <H4 style={{ marginStart: 8 }}>|</H4>
        <TouchableOpacity
          onPress={openPrivacy}
          testID="privacy-button"
          style={{ marginStart: 8 }}>
          <H4>{Localized('Privacy')}</H4>
        </TouchableOpacity>
      </Flexbox>
      <H5Secondary>{`ARQ Version: ${config.expo.version}`}</H5Secondary>
    </Flexbox>
  );
};

TermsAndPrivacy.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TermsAndPrivacy;
