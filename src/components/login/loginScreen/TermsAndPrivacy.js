import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H4, Flexbox } from '../../common';
import { Localized } from '../../../translations/Localized';

const url =
  'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/resources%2FFeb%202020%20Comp%20Plan.pdf?alt=media&token=5c94e075-d6a5-444a-861e-7442d4325b70';

const TermsAndPrivacy = ({ navigation }) => {
  const openTerms = () =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Terms').toUpperCase(),
        url: url,
        contentType: 'pdf',
      },
    });
  const openPrivacy = () =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Privacy').toUpperCase(),
        url: url,
        contentType: 'pdf',
      },
    });
  const openData = () =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Data').toUpperCase(),
        url: url,
        contentType: 'pdf',
      },
    });
  return (
    <Flexbox
      accessibilityLabel="Terms Privacy Data"
      justify="center"
      direction="row"
      padding={14}>
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
      <H4 style={{ marginStart: 8 }}>|</H4>
      <TouchableOpacity
        onPress={openData}
        testID="data-button"
        style={{ marginStart: 8 }}>
        <H4>{Localized('Data')}</H4>
      </TouchableOpacity>
    </Flexbox>
  );
};

TermsAndPrivacy.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TermsAndPrivacy;
