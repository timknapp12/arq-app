import React from 'react';
import styled from 'styled-components/native';
import { H4Bold, Flexbox, H4Secondary } from '../Common';
import { Localized, init } from '../../Translations/Localized';

const Section = styled.View``;

const Overview = () => {
  init();

  return (
    <Flexbox width="100%" height="100%">
      <Flexbox padding={20} width="100%" direction="row">
        <Section>
          <H4Bold>Sloane Taylor</H4Bold>
          <H4Secondary>{`${Localized('rank')}: Distributor`}</H4Secondary>
        </Section>
        <Section>
          <H4Bold>2/16/20</H4Bold>
          <H4Secondary>{Localized('join-date')}</H4Secondary>
        </Section>
      </Flexbox>
      <H4Bold>{Localized('overview')}</H4Bold>
    </Flexbox>
  );
};

export default Overview;
