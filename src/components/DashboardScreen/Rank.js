import React from 'react';
import { H2Bold, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';

const Rank = () => {
  init();

  return (
    <Flexbox>
      <H2Bold>{Localized('rank')}</H2Bold>
    </Flexbox>
  );
};

export default Rank;
