import React from 'react';
import { H2Bold, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';

const Overview = () => {
  init();

  return (
    <Flexbox>
      <H2Bold>{Localized('overview')}</H2Bold>
    </Flexbox>
  );
};

export default Overview;
