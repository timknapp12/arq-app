import React, { useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { H4, Flexbox, H4Secondary, H3 } from '../common';
import { Localized } from '../../translations/Localized';
import Donut from './Donut';
import AppContext from '../../contexts/AppContext';
import DashboardScreenContext from '../../contexts/DashboardScreenContext';

const Overview = () => {
  const { theme } = useContext(AppContext);
  const { user, closeMenus } = useContext(DashboardScreenContext);

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <Flexbox width="100%" onStartShouldSetResponder={() => true}>
        <Flexbox
          accessibilityLabel="Distributor name and rank"
          padding={20}
          width="100%"
        >
          <H3>{`${Localized('Welcome back')} ${
            user?.associate?.firstName ?? ''
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
              percentage={user?.pv}
              max={user?.pv}
              color={theme.donut1primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor monthly cv" width="auto">
            <H4 testID="cv-donut-label">CV</H4>
            <Donut
              testID="cv-donut-svg"
              percentage={user?.cv}
              max={user?.cv}
              color={theme.donut2primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor monthly ov" width="auto">
          <H4 testID="ov-donut-label">OV</H4>
          <Donut
            testID="ov-donut-svg"
            percentage={user?.totalOv}
            max={user?.totalOv}
            color={theme.donut3primaryColor}
            onPress={closeMenus}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

export default Overview;
