import React from 'react';
import { H2Bold, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';

const OVDetail = () => {
  init();

  return (
    <Flexbox>
      <H2Bold>{Localized('ov-detail')}</H2Bold>
    </Flexbox>
  );
};

export default OVDetail;
