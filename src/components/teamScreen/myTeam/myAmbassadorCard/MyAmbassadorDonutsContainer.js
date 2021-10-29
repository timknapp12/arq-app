import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Flexbox, H4 } from '../../../common';
import Donut from '../../../dashboardScreen/Donut';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { Localized } from '../../../../translations/Localized';
import {
  donut1primaryColor,
  donut2primaryColor,
  donut3primaryColor,
} from '../../../../styles/colors';

const MyAmbassadorDonutsContainer = ({ member }) => {
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const { pv, qoV, pa } = member;

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <Flexbox width="100%">
        <Flexbox width="100%" direction="row">
          <Flexbox accessibilityLabel="Distributor monthly pv" width="auto">
            <H4 testID="my-ambassador-pv-donut-label">
              {Localized('Total PV')}
            </H4>
            <Donut
              testID="pv-donut-svg"
              percentage={pv}
              max={pv}
              color={donut1primaryColor}
              onPress={closeAllMenus}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor monthly qov" width="auto">
            <H4 testID="my-ambassador-qov-donut-label">
              {Localized('Total QOV')}
            </H4>
            <Donut
              testID="cv-donut-svg"
              percentage={qoV}
              max={qoV}
              color={donut2primaryColor}
              onPress={closeAllMenus}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox
          accessibilityLabel="Distributor monthly personally enrolled"
          width="auto"
        >
          <H4 testID="my-ambassador-ov-donut-label">
            {Localized('Personally Enrolled')}
          </H4>
          <Donut
            testID="ov-donut-svg"
            percentage={pa}
            max={pa}
            color={donut3primaryColor}
            onPress={closeAllMenus}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

MyAmbassadorDonutsContainer.propTypes = { member: PropTypes.object.isRequired };

export default MyAmbassadorDonutsContainer;
