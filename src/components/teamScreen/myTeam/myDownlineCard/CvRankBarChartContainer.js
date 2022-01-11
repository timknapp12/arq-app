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
  const { cv = 0, pa, rank, previousAmbassadorMonthlyRecord } = member;

  // TODO - get current CV Rank and replace OV Rank
  // default rankId for an inactive ambassador is 1
  // show what rank is next
  const currentRankId = rank?.rankId ?? 1;

  // get maximums for each category for chart
  const requiredCvForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'minimumQoV',
  );

  // get percentages based on max above
  const thisMonthCvWidth = getPercentage(cv, requiredCvForNextRank);
  const lastMonthCvWidth = getPercentage(
    previousAmbassadorMonthlyRecord?.preferredCustomerVolume ??
      0 + previousAmbassadorMonthlyRecord?.retailCustomerVolume ??
      0,
    requiredCvForNextRank,
  );

  // TODO get real data for last month autoship volume - replace pa and autoship
  const thisMonthAutoshipWidth = pa > 0 ? 100 : 0;
  const lastMonthAutoshipWidth =
    previousAmbassadorMonthlyRecord?.autoship > 0 ? 100 : 0;

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
          <H4>{Localized('Autoship CV')}</H4>
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
            primaryTotal={pa}
            secondaryTotal={lastMonthAutoshipWidth}
          />
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

CvRankBarChartContainer.propTypes = {
  member: PropTypes.object.isRequired,
};

export default CvRankBarChartContainer;
