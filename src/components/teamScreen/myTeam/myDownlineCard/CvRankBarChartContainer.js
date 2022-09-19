import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Flexbox, Gap, H4, H5 } from '../../../common';
import AppContext from '../../../../contexts/AppContext';
import LoginContext from '../../../../contexts/LoginContext';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { Localized } from '../../../../translations/Localized';
import Bar from './Bar';
import BarChartLegend from './BarChartLegend';
import {
  findRequiredValueOfNextRank,
  getPercentage,
} from '../../../../utils/teamView/calculateBasedOnNextRank';

const CvRankBarChartContainer = ({ member }) => {
  const { theme } = useContext(AppContext);
  const { ranks } = useContext(LoginContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const [lastMonthCv, setLastMonthCv] = useState(0);
  const {
    cv = 0,
    customerSalesRank,
    previousAmbassadorMonthlyRecord,
    // teamAutoshipVolume,
  } = member;

  const defaultRankForInactiveAmbassador = 1;
  const currentRankId =
    customerSalesRank?.customerSalesRankId ?? defaultRankForInactiveAmbassador;

  const requiredCvForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'minimumQoV',
  );

  const thisMonthCvWidth = getPercentage(cv, requiredCvForNextRank);
  const lastMonthCvWidth = getPercentage(
    previousAmbassadorMonthlyRecord?.preferredCustomerVolume ??
      0 + previousAmbassadorMonthlyRecord?.retailCustomerVolume ??
      0,
    requiredCvForNextRank,
  );

  // const lastMonthAutoship = previousAmbassadorMonthlyRecord?.teamAutoshipVolume;
  // const thisMonthAutoshipWidth = getPercentage(
  //   teamAutoshipVolume,
  //   lastMonthAutoship,
  // );
  // const lastMonthAutoshipWidth = lastMonthAutoship > 0 ? 100 : 0;

  useEffect(() => {
    // handle sum of NaN in case the values are null
    let lastMonthCv =
      previousAmbassadorMonthlyRecord?.preferredCustomerVolume ??
      0 + previousAmbassadorMonthlyRecord?.retailCustomerVolume ??
      0;
    if (isNaN(lastMonthCv)) {
      lastMonthCv = 0;
    }
    setLastMonthCv(lastMonthCv);
  }, [lastMonthCv]);

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <>
        <H5 style={{ textAlign: 'center' }}>
          {Localized(`Progress towards next rank`)}
        </H5>
        <Flexbox align="flex-start" width="100%">
          <H4>{Localized('Total CV')}</H4>
          <Bar value={thisMonthCvWidth} color={theme.donut2primaryColor} />
          <Bar value={lastMonthCvWidth} color={theme.donut2secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut2primaryColor}
            secondaryColor={theme.donut2secondaryColor}
            primaryTotal={cv}
            secondaryTotal={lastMonthCv}
            requiredTotal={requiredCvForNextRank}
          />
          <Gap />
          {/* <H4>{Localized('Subscription CV')}</H4>
          <Bar
            value={thisMonthAutoshipWidth}
            color={theme.donut3primaryColor}
          />
          <Bar
            value={lastMonthAutoshipWidth}
            color={theme.donut3secondaryColor}
          />
          <BarChartLegend
            primaryColor={theme.donut3primaryColor}
            secondaryColor={theme.donut3secondaryColor}
            primaryTotal={teamAutoshipVolume ?? 0}
            secondaryTotal={lastMonthAutoship ?? 0}
          /> */}
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

CvRankBarChartContainer.propTypes = {
  member: PropTypes.object.isRequired,
};

export default CvRankBarChartContainer;
