import React, { useContext } from 'react';
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

const OvRankBarChartContainer = ({ member }) => {
  const { theme } = useContext(AppContext);
  const { ranks } = useContext(LoginContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const { pv, qoV, pa, rank, previousAmbassadorMonthlyRecord } = member;

  // default rankId for an inactive ambassador is 1
  // show what rank is next
  const currentRankId = rank?.rankId ?? 1;

  // get maximums for each category for chart
  const requiredPvForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'requiredPv',
  );

  const requiredQovForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'minimumQoV',
  );

  const requiredPaForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'requiredPa',
  );

  // get percentages based on max above
  const thisMonthPvWidth = getPercentage(pv, requiredPvForNextRank);
  const lastMonthPvWidth = getPercentage(
    previousAmbassadorMonthlyRecord?.personalVolume ?? 0,
    requiredPvForNextRank,
  );

  const thisMonthQovWidth = getPercentage(qoV, requiredQovForNextRank);
  const lastMonthQovWidth = getPercentage(
    previousAmbassadorMonthlyRecord?.qov ?? 0,
    requiredQovForNextRank,
  );

  const thisMonthPaWidth = getPercentage(pa, requiredPaForNextRank);
  const lastMonthPaWidth = getPercentage(
    previousAmbassadorMonthlyRecord?.personallySponsoredActiveAmbassadorCount ??
      0,
    requiredPaForNextRank,
  );

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <>
        <H5 style={{ textAlign: 'center' }}>
          {/* TODO Put in translations for this phrase for other languages*/}
          {Localized(`Progress towards next rank`)}
        </H5>
        <Flexbox align="flex-start" width="100%">
          <H4>{Localized('Total PV')}</H4>
          <Bar value={thisMonthPvWidth} color={theme.donut1primaryColor} />
          <Bar value={lastMonthPvWidth} color={theme.donut1secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut1primaryColor}
            secondaryColor={theme.donut1secondaryColor}
            primaryTotal={pv}
            secondaryTotal={
              previousAmbassadorMonthlyRecord?.personalVolume ?? 0
            }
            requiredTotal={requiredPvForNextRank}
          />
          <Gap />
          <H4>{Localized('Total QOV')}</H4>
          <Bar value={thisMonthQovWidth} color={theme.donut2primaryColor} />
          <Bar value={lastMonthQovWidth} color={theme.donut2secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut2primaryColor}
            secondaryColor={theme.donut2secondaryColor}
            primaryTotal={qoV}
            secondaryTotal={previousAmbassadorMonthlyRecord?.qov ?? 0}
            requiredTotal={requiredQovForNextRank}
          />
          <Gap />
          <H4>{Localized('Personally Active')}</H4>
          <Bar value={thisMonthPaWidth} color={theme.donut3primaryColor} />
          <Bar value={lastMonthPaWidth} color={theme.donut3secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut3primaryColor}
            secondaryColor={theme.donut3secondaryColor}
            primaryTotal={pa}
            secondaryTotal={
              previousAmbassadorMonthlyRecord?.personallySponsoredActiveAmbassadorCount ??
              0
            }
            requiredTotal={requiredPaForNextRank}
          />
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

OvRankBarChartContainer.propTypes = {
  member: PropTypes.object.isRequired,
};

export default OvRankBarChartContainer;
