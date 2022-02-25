import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { H4, Flexbox, H4Secondary, H3 } from '../common';
import { Localized } from '../../translations/Localized';
import Donut from './Donut';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';

const Overview = ({ user, closeMenus }) => {
  const { theme } = useContext(AppContext);
  const { userProfile } = useContext(LoginContext);

  const { pv, totalOv, cv } = user;

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <Flexbox width="100%" onStartShouldSetResponder={() => true}>
        <Flexbox
          accessibilityLabel="Distributor name and rank"
          padding={20}
          width="100%"
        >
          <H3>{`${Localized('Welcome back')} ${
            userProfile?.firstName ?? ''
          }`}</H3>
          <H4Secondary>{`${Localized('OV Rank')}: ${
            user?.rank?.rankName ?? ''
          }`}</H4Secondary>
          <H4Secondary>{`${Localized('CV Rank')}: ${
            user?.customerSalesRank?.rankName ?? ''
          }`}</H4Secondary>
        </Flexbox>

        <Flexbox padding={20} width="100%" direction="row" justify="center">
          <Flexbox accessibilityLabel="Distributor monthly pv" width="auto">
            <H4 testID="pv-donut-label">PV</H4>
            <Donut
              testID="pv-donut-svg"
              percentage={pv}
              max={pv}
              color={theme.donut1primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor monthly cv" width="auto">
            <H4 testID="cv-donut-label">CV</H4>
            <Donut
              testID="cv-donut-svg"
              percentage={cv}
              max={cv}
              color={theme.donut2primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor monthly ov" width="auto">
          <H4 testID="ov-donut-label">OV</H4>
          <Donut
            testID="ov-donut-svg"
            percentage={totalOv}
            max={totalOv}
            color={theme.donut3primaryColor}
            onPress={closeMenus}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

Overview.propTypes = {
  user: PropTypes.object,
  closeMenus: PropTypes.func,
};

export default Overview;
