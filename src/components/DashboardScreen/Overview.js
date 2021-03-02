import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4Bold, Flexbox, H4Secondary } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import Donut from './Donut';
import { pacificBlue, darkViolet } from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Overview = ({ user, fadeOut }) => {
  init();
  const { thisMonthPV, thisMonthOV, thisMonthCV } = user;
  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <Flexbox width="100%" onStartShouldSetResponder={() => true}>
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
              percentage={thisMonthPV}
              max={thisMonthPV}
              color={pacificBlue}
              view="overview"
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor monthly cv" width="auto">
            <ChartTitle testID="cv-donut-label">{Localized('cv')}</ChartTitle>
            <Donut
              testID="cv-donut-svg"
              percentage={thisMonthCV}
              max={thisMonthCV}
              view="overview"
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor monthly ov" width="auto">
          <ChartTitle testID="ov-donut-label">{Localized('ov')}</ChartTitle>
          <Donut
            testID="ov-donut-svg"
            percentage={thisMonthOV}
            max={thisMonthOV}
            color={darkViolet}
            view="overview"
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

Overview.propTypes = {
  user: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default Overview;
