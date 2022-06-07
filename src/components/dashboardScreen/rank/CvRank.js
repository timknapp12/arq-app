import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import * as Analytics from 'expo-firebase-analytics';
import { H4, H5, Flexbox } from '../../common';
import { Localized } from '../../../translations/Localized';
import DoubleDonut from '../DoubleDonut';
import Slider from '../Slider';
import AppContext from '../../../contexts/AppContext';
import DashboardScreenContext from '../../../contexts/DashboardScreenContext';
import { reshapePerc } from '../../../utils/calculateLegPercentages';
import stringify from '../../../utils/roundDownAndAddCommas/stringify';

const LegendContainer = styled.View`
  margin-top: 8px;
`;

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dot = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 4px;
  background-color: ${({ dotFill }) => dotFill};
`;

const CVRank = () => {
  const { theme } = useContext(AppContext);
  const { user, closeMenus } = useContext(DashboardScreenContext);

  const {
    cv,
    previousAmbassadorMonthlyRecord,
    // teamAutoshipVolume
  } = user;

  const lastMonthCV =
    previousAmbassadorMonthlyRecord?.preferredCustomerVolume +
    previousAmbassadorMonthlyRecord?.retailCustomerVolume;

  // const lastMonthAutoship = previousAmbassadorMonthlyRecord?.teamAutoshipVolume;

  const initialRankName = user?.customerSalesRank?.rankName;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    minimumQoV: user?.customerSalesRank?.minimumCv,
    rankName: user?.customerSalesRank?.rankName,
    rankId: user?.customerSalesRank?.customerSalesRankId,
  };
  const [rank, setRank] = useState(initialRank);
  const [showRemainingCV, setShowRemainingCV] = useState(false);
  const [showTapIcon, setShowTapIcon] = useState(false);

  const [isQualified, setIsQualified] = useState(false);

  const validateQualification = (CV, minimumQoV) => {
    if (CV >= minimumQoV) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
  };

  useEffect(() => {
    const formattedName = rank.rankName.split(' ').join('_');
    Analytics.logEvent(`slider_set_to_${formattedName}_in_cv_rank`);
    const { cv } = user;
    const { minimumQoV } = rank;
    validateQualification(cv, minimumQoV);
    setShowTapIcon(cv < minimumQoV);
    if (minimumQoV < cv) {
      setShowRemainingCV(false);
    }
  }, [user, rank]);

  // These are used to restrain the percentages from being way higher than the max causing a ton of extra revolutions on the animations
  const cvPerc = reshapePerc(cv, rank.minimumQoV);

  const lastMonthCVPerc = reshapePerc(lastMonthCV, rank.minimumQoV);

  // const autoshipPerc = reshapePerc(teamAutoshipVolume, lastMonthAutoship);

  return (
    <>
      <Slider
        rankName={rankName}
        setRankName={setRankName}
        rank={rank}
        setRank={setRank}
        isQualified={isQualified}
      />
      <Flexbox
        accessibilityLabel="CV Rank cv"
        width="100%"
        justify="space-between"
      >
        <H4>
          {showRemainingCV ? Localized('Remaining CV') : Localized('Total CV')}
        </H4>
        <DoubleDonut
          outerpercentage={cvPerc}
          outermax={100}
          outercolor={theme.donut1primaryColor}
          innerpercentage={lastMonthCVPerc}
          innermax={100}
          innercolor={theme.donut1secondaryColor}
          view="rank"
          onPress={() => {
            closeMenus();
            showTapIcon && setShowRemainingCV((state) => !state);
          }}
          showTapIcon={showTapIcon}
          showRemainingQov={showRemainingCV}
          remainingQov={rank?.minimumQoV - Math.floor(cv)}
        />
        <LegendContainer>
          <Legend>
            <Dot dotFill={theme.donut1primaryColor} />
            <H5>{`${stringify(cv)} ${Localized('of')} ${stringify(
              rank?.minimumQoV,
            )}`}</H5>
          </Legend>
          <Legend>
            <Dot dotFill={theme.donut1secondaryColor} />
            <H5>{`${stringify(lastMonthCV)} ${Localized('of')} ${stringify(
              rank?.minimumQoV,
            )}`}</H5>
          </Legend>
        </LegendContainer>
      </Flexbox>

      {/* <Flexbox
        style={{ paddingTop: 12 }}
        accessibilityLabel="CV Rank autoship cv"
        width="auto"
      >
        <H4>{Localized('Autoship CV')}</H4>
        <DoubleDonut
          outerpercentage={autoshipPerc}
          outermax={100}
          outercolor={theme.donut2primaryColor}
          innerpercentage={100}
          innermax={100}
          innercolor={theme.donut3secondaryColor}
          view="rank"
          onPress={() => {
            closeMenus();
          }}
        />
        <LegendContainer>
          <Legend>
            <Dot dotFill={theme.donut2primaryColor} />
            <H5>{stringify(teamAutoshipVolume)}</H5>
          </Legend>
          <Legend>
            <Dot dotFill={theme.donut3secondaryColor} />
            <H5>{stringify(lastMonthAutoship)}</H5>
          </Legend>
        </LegendContainer>
      </Flexbox> */}
    </>
  );
};

export default CVRank;
