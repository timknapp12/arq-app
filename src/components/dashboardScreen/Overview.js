import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { H4, Flexbox, H4Secondary, H3 } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import Donut from './Donut';
import {
  donut1primaryColor,
  donut2primaryColor,
  donut3primaryColor,
} from '../../styles/colors';

const Overview = ({ user, fadeOut }) => {
  initLanguage();
  const { pv, totalOv, cv } = user;
  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <Flexbox width="100%" onStartShouldSetResponder={() => true}>
        <Flexbox
          accessibilityLabel="Distributor name and rank"
          padding={20}
          width="100%">
          <H3>{`${Localized('Welcome back')} ${
            user?.associate?.firstName
          }`}</H3>
          <H4Secondary>{`${Localized('Rank')}: Distributor`}</H4Secondary>
        </Flexbox>

        <Flexbox padding={20} width="100%" direction="row">
          <Flexbox accessibilityLabel="Distributor monthly pv" width="auto">
            <H4 testID="pv-donut-label">{Localized('PV')}</H4>
            <Donut
              testID="pv-donut-svg"
              percentage={pv}
              max={pv}
              color={donut1primaryColor}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor monthly cv" width="auto">
            <H4 testID="cv-donut-label">{Localized('CV')}</H4>
            <Donut
              testID="cv-donut-svg"
              percentage={cv}
              max={cv}
              color={donut2primaryColor}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor monthly ov" width="auto">
          <H4 testID="ov-donut-label">{Localized('OV')}</H4>
          <Donut
            testID="ov-donut-svg"
            percentage={totalOv}
            max={totalOv}
            color={donut3primaryColor}
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
