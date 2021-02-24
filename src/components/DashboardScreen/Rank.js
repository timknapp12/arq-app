import React from 'react';
import styled from 'styled-components/native';
import { H4Bold, H5, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import DoubleDonut from './DoubleDonut';
import {
  mayaBlue,
  pacificBlue,
  darkViolet,
  heliotrope,
} from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const LegendContainer = styled.View`
  margin-top: 8px;
`;

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Square = styled.View`
  height: 16px;
  width: 16px;
  margin-right: 2px;
  background-color: ${({ squareFill }) => squareFill};
`;

const Rank = () => {
  init();

  return (
    <Flexbox width="100%">
      <Flexbox
        accessibilityLabel="Distributor rank"
        padding={20}
        width="100%"
        direction="row">
        <Flexbox accessibilityLabel="monthly comparrison pv" width="auto">
          <ChartTitle>{Localized('total-pv')}</ChartTitle>
          <DoubleDonut
            outerpercentage={100}
            outermax={100}
            outercolor={pacificBlue}
            innerpercentage={85}
            innermax={100}
            innercolor={mayaBlue}
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={pacificBlue} />
              <H5>{`100 ${Localized('of')} 100`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={mayaBlue} />
              <H5>{`85 ${Localized('of')} 100`}</H5>
            </Legend>
          </LegendContainer>
        </Flexbox>

        <Flexbox
          accessibilityLabel="monthly comparrison qov"
          style={{ position: 'relative' }}
          width="auto">
          <ChartTitle>{Localized('total-qov')}</ChartTitle>
          <DoubleDonut
            outerpercentage={400}
            outermax={600}
            outercolor={darkViolet}
            innerpercentage={225}
            innermax={600}
            innercolor={heliotrope}
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={darkViolet} />
              <H5>{`400 ${Localized('of')} 600`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={heliotrope} />
              <H5>{`225 ${Localized('of')} 600`}</H5>
            </Legend>
          </LegendContainer>
        </Flexbox>
      </Flexbox>

      <Flexbox
        accessibilityLabel="monthly comparrison personally enrolled"
        width="auto">
        <ChartTitle>{Localized('personally-enrolled')}</ChartTitle>
        <DoubleDonut
          outerpercentage={2}
          outermax={2}
          outercolor="yellow"
          innerpercentage={1}
          innermax={2}
          innercolor="wheat"
        />
        <LegendContainer>
          <Legend>
            <Square squareFill="yellow" />
            <H5>{`2 ${Localized('of')} 2`}</H5>
          </Legend>
          <Legend>
            <Square squareFill="wheat" />
            <H5>{`1 ${Localized('of')} 2`}</H5>
          </Legend>
        </LegendContainer>
      </Flexbox>
    </Flexbox>
  );
};

export default Rank;
