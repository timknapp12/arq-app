import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { H4Bold, Flexbox, H4Secondary } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import Donut from './Donut';
import { pacificBlue, darkViolet } from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Overview = () => {
  init();

  return (
    <Flexbox width="100%">
      <Flexbox
        accessibilityLabel="Distributor name and rank"
        padding={20}
        width="100%"
        direction="row">
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
        <Flexbox accessibilityLabel="Distributor monthly pv" width="auto">
          <ChartTitle testID="pv-donut-label">{Localized('pv')}</ChartTitle>
          <Donut
            testID="pv-donut-svg"
            percentage={175}
            max={175}
            color={pacificBlue}
          />
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor monthly cv" width="auto">
          <ChartTitle testID="cv-donut-label">{Localized('cv')}</ChartTitle>
          <Donut testID="cv-donut-svg" percentage={256} max={256} />
        </Flexbox>
      </Flexbox>

      <Flexbox accessibilityLabel="Distributor monthly ov" width="auto">
        <ChartTitle testID="ov-donut-label">{Localized('ov')}</ChartTitle>
        <Donut
          testID="ov-donut-svg"
          percentage={456}
          max={456}
          color={darkViolet}
        />
      </Flexbox>
    </Flexbox>
  );
};

export default Overview;
