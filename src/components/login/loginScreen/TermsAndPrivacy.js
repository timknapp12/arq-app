import React from 'react';
import { TouchableOpacity } from 'react-native';
import { H4, Flexbox } from '../../common';
import { Localized } from '../../../translations/Localized';

const TermsAndPrivacy = () => {
  const openTerms = () => {};
  const openPrivacy = () => {};
  const openData = () => {};
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

export default TermsAndPrivacy;
