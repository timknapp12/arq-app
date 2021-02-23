import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { H4Bold, Flexbox, H4Secondary } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import Donut from './Donut';
import { pacificBlue, purple } from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Overview = () => {
  init();

  return (
    <Flexbox width="100%">
      <Flexbox padding={20} width="100%" direction="row">
        <View>
          <H4Bold>Sloane Taylor</H4Bold>
          <H4Secondary>{`${Localized('rank')}: Distributor`}</H4Secondary>
        </View>
        <View>
          <H4Bold>2/16/20</H4Bold>
          <H4Secondary>{Localized('join-date')}</H4Secondary>
        </View>
      </Flexbox>
      <Flexbox padding={20} width="100%" direction="row">
        <Flexbox width="auto">
          <ChartTitle>PV</ChartTitle>
          <Donut percentage={175} max={175} color={pacificBlue} />
        </Flexbox>
        <Flexbox width="auto">
          <ChartTitle>CV</ChartTitle>
          <Donut percentage={256} max={256} />
        </Flexbox>
      </Flexbox>
      <Flexbox width="auto">
        <ChartTitle>OV</ChartTitle>
        <Donut percentage={456} max={456} color={purple} />
      </Flexbox>
    </Flexbox>
  );
};

export default Overview;
