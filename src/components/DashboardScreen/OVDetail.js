import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H4Bold, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import Slider from './Slider';
import Donut from './Donut';
import { pacificBlue } from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const OVDetail = ({ ranklist }) => {
  init();
  const initialRankName = Localized('pro');
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    id: 2,
    requiredPV: 100,
    requiredQOV: 600,
    name: Localized('pro'),
  };
  const [rank, setRank] = useState(initialRank);

  return (
    <Flexbox onStartShouldSetResponder={() => true} width="100%">
      <Slider
        rankName={rankName}
        setRankName={setRankName}
        rank={rank}
        setRank={setRank}
        ranklist={ranklist}
      />

      <Flexbox padding={20} width="100%" direction="row">
        <Flexbox accessibilityLabel="Distributor leg one" width="auto">
          <ChartTitle testID="leg-one-label">{Localized('leg-one')}</ChartTitle>
          <Donut
            testID="leg-one-donut-svg"
            percentage={160}
            max={360}
            color={pacificBlue}
            view="ov detail"
          />
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor leg two" width="auto">
          <ChartTitle testID="leg-two-label">{Localized('leg-two')}</ChartTitle>
          <Donut
            testID="leg-two-donut-svg"
            percentage={100}
            max={360}
            color={pacificBlue}
            view="ov detail"
          />
        </Flexbox>
      </Flexbox>

      <Flexbox accessibilityLabel="Distributor leg three" width="auto">
        <ChartTitle testID="leg-three-label">
          {Localized('leg-three')}
        </ChartTitle>
        <Donut
          testID="leg-three-donut-svg"
          percentage={40}
          max={360}
          color={pacificBlue}
          view="ov detail"
        />
      </Flexbox>
    </Flexbox>
  );
};

OVDetail.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      requiredPV: PropTypes.number,
      requiredQOV: PropTypes.number,
      legMaxPerc: PropTypes.number,
      legMaxOV: PropTypes.number,
    }),
  ),
};

export default OVDetail;
