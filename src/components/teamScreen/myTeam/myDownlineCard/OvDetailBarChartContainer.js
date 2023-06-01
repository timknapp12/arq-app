import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Flexbox,
  Gap,
  H5,
  QualifiedIcon,
  NotQualifiedIcon,
} from '../../../common';
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
import stringify from '../../../../utils/roundDownAndAddCommas/stringify';

const OvDetailBarChartContainer = ({ member }) => {
  const { theme } = useContext(AppContext);
  const { ranks } = useContext(LoginContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const { leg1, leg2, leg3, rank, previousAmbassadorMonthlyRecord } = member;

  // default rankId for an inactive ambassador is 1
  // show what rank is next
  const currentRankId = rank?.rankId ?? 1;

  const maxQovForNextRank = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'maximumPerLeg',
  );

  const nextRankName = findRequiredValueOfNextRank(
    currentRankId,
    ranks,
    'rankName',
  );

  // get percentages based on max above
  const thisMonthLeg1Width = getPercentage(leg1, maxQovForNextRank);
  const lastMonthLeg1Width = getPercentage(
    previousAmbassadorMonthlyRecord?.leg1 ?? 0,
    maxQovForNextRank,
  );

  const thisMonthLeg2Width = getPercentage(leg2, maxQovForNextRank);
  const lastMonthLeg2Width = getPercentage(
    previousAmbassadorMonthlyRecord?.leg2 ?? 0,
    maxQovForNextRank,
  );

  const thisMonthLeg3Width = getPercentage(leg3, maxQovForNextRank);
  const lastMonthLeg3Width = getPercentage(
    previousAmbassadorMonthlyRecord?.leg3 ?? 0,
    maxQovForNextRank,
  );

  const qualifiedText =
    Localized('qualified').charAt(0).toUpperCase() +
    Localized('qualified').slice(1);

  // eslint-disable-next-line react/prop-types
  const BarTitle = ({ legName, amount }) => {
    const difference = maxQovForNextRank - amount;
    if (amount < maxQovForNextRank) {
      return (
        <Flexbox direction="row" justify="flex-start" padding={4}>
          <NotQualifiedIcon />
          <H5 style={{ marginStart: 8 }}>{`${legName} - ${Localized(
            'Remaining QOV',
          )} ${stringify(difference)}`}</H5>
        </Flexbox>
      );
    } else {
      return (
        <Flexbox direction="row" justify="flex-start" padding={4}>
          <QualifiedIcon />
          <H5 style={{ marginStart: 8 }}>{`${legName} - ${qualifiedText}`}</H5>
        </Flexbox>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <>
        <H5 style={{ textAlign: 'center' }}>
          {`${Localized(`Progress towards next rank`)}: ${nextRankName}`}
        </H5>
        <H5 style={{ textAlign: 'center' }}>
          {`${Localized('Maximum QOV Per Leg')}: ${stringify(
            maxQovForNextRank,
          )}`}
        </H5>
        <Flexbox align="flex-start" width="100%">
          <BarTitle legName="Leg1" amount={leg1} />
          <Bar value={thisMonthLeg1Width} color={theme.donut1primaryColor} />
          <Bar value={lastMonthLeg1Width} color={theme.donut1secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut1primaryColor}
            secondaryColor={theme.donut1secondaryColor}
            primaryTotal={leg1}
            secondaryTotal={previousAmbassadorMonthlyRecord?.leg1 ?? 0}
            requiredTotal={maxQovForNextRank}
          />
          <Gap />
          <BarTitle legName="Leg2" amount={leg2} />
          <Bar value={thisMonthLeg2Width} color={theme.donut2primaryColor} />
          <Bar value={lastMonthLeg2Width} color={theme.donut2secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut2primaryColor}
            secondaryColor={theme.donut2secondaryColor}
            primaryTotal={leg2}
            secondaryTotal={previousAmbassadorMonthlyRecord?.leg2 ?? 0}
            requiredTotal={maxQovForNextRank}
          />
          <Gap />
          <BarTitle legName="Leg3" amount={leg3} />
          <Bar value={thisMonthLeg3Width} color={theme.donut3primaryColor} />
          <Bar value={lastMonthLeg3Width} color={theme.donut3secondaryColor} />
          <BarChartLegend
            primaryColor={theme.donut3primaryColor}
            secondaryColor={theme.donut3secondaryColor}
            primaryTotal={leg3}
            secondaryTotal={previousAmbassadorMonthlyRecord?.leg3 ?? 0}
            requiredTotal={maxQovForNextRank}
          />
        </Flexbox>
      </>
    </TouchableWithoutFeedback>
  );
};

OvDetailBarChartContainer.propTypes = {
  member: PropTypes.object.isRequired,
};

export default OvDetailBarChartContainer;
