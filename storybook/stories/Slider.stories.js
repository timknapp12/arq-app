import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer, H5 } from '../../src/components/common';
import Slider from '../../src/components/dashboardScreen/Slider';

const Example = () => {
  const initialRankName = 'pro';
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    id: 2,
    requiredPv: 100,
    minimumQoV: 600,
    name: 'pro',
  };
  const [rank, setRank] = useState(initialRank);

  return (
    <>
      <Slider
        rankName={rankName}
        setRankName={setRankName}
        rank={rank}
        setRank={setRank}
        ranklist={ranklist}
      />
      <H5>{`Rank name: ${rank.name}`}</H5>
      <H5>{`Required PV: ${rank.requiredPv}`}</H5>
      <H5>{`Required OV: ${rank.minimumQoV}`}</H5>
      <H5>{`Leg Max Percentage: ${rank.legMaxPercentage}`}</H5>
      <H5>{`Leg Max OV: ${rank.maximumPerLeg}`}</H5>
    </>
  );
};

storiesOf('Slider', module)
  .addDecorator((getStory) => (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      {getStory()}
    </ScreenContainer>
  ))
  .add('Default', () => <Example />);

const ranklist = [
  {
    legMaxPercentage: 0,
    maximumPerLeg: 0,
    id: 0,
    requiredPv: 0,
    minimumQoV: 0,
    name: 'distributor',
  },
  {
    legMaxPercentage: 60,
    maximumPerLeg: 180,
    id: 1,
    requiredPv: 100,
    minimumQoV: 300,
    name: 'builder',
  },
  {
    legMaxPercentage: 60,
    maximumPerLeg: 360,
    id: 2,
    requiredPv: 100,
    minimumQoV: 600,
    name: 'pro',
  },
  {
    legMaxPercentage: 60,
    maximumPerLeg: 900,
    id: 3,
    requiredPv: 100,
    minimumQoV: 1500,
    name: 'executive',
  },
  {
    legMaxPercentage: 50,
    maximumPerLeg: 2250,
    id: 4,
    requiredPv: 100,
    minimumQoV: 4500,
    name: 'elite',
  },
  {
    legMaxPercentage: 50,
    maximumPerLeg: 5000,
    id: 5,
    requiredPv: 100,
    minimumQoV: 10000,
    name: 'bronze',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 10000,
    id: 6,
    requiredPv: 200,
    minimumQoV: 25000,
    name: 'silver',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 20000,
    id: 7,
    requiredPv: 200,
    minimumQoV: 50000,
    name: 'gold',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 40000,
    id: 8,
    requiredPv: 200,
    minimumQoV: 100000,
    name: 'platinum',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 80000,
    id: 9,
    requiredPv: 200,
    minimumQoV: 200000,
    name: 'ruby',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 140000,
    id: 10,
    requiredPv: 200,
    minimumQoV: 350000,
    name: 'emerald',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 200000,
    id: 11,
    requiredPv: 200,
    minimumQoV: 500000,
    name: 'diamond',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 300000,
    id: 12,
    requiredPv: 200,
    minimumQoV: 750000,
    name: 'blue-diamond',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 400000,
    id: 13,
    requiredPv: 200,
    minimumQoV: 1000000,
    name: 'black-diamond',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 600000,
    id: 14,
    requiredPv: 200,
    minimumQoV: 1500000,
    name: 'royal-diamond',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 800000,
    id: 15,
    requiredPv: 200,
    minimumQoV: 2000000,
    name: 'presidential-diamond',
  },
  {
    legMaxPercentage: 40,
    maximumPerLeg: 1200000,
    id: 16,
    requiredPv: 200,
    minimumQoV: 3000000,
    name: 'crown-diamond',
  },
];
