import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer, H5 } from '../../src/components/Common';
import Slider from '../../src/components/DashboardScreen/Slider';

const Example = () => {
  const initialRankName = 'pro';
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    id: 2,
    requiredPV: 100,
    requiredQOV: 600,
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
      <H5>{`Required PV: ${rank.requiredPV}`}</H5>
      <H5>{`Required OV: ${rank.requiredQOV}`}</H5>
      <H5>{`Leg Max Percentage: ${rank.legMaxPerc}`}</H5>
      <H5>{`Leg Max OV: ${rank.legMaxOV}`}</H5>
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
    legMaxPerc: 0,
    legMaxOV: 0,
    id: 0,
    requiredPV: 0,
    requiredQOV: 0,
    name: 'distributor',
  },
  {
    legMaxPerc: 60,
    legMaxOV: 180,
    id: 1,
    requiredPV: 100,
    requiredQOV: 300,
    name: 'builder',
  },
  {
    legMaxPerc: 60,
    legMaxOV: 360,
    id: 2,
    requiredPV: 100,
    requiredQOV: 600,
    name: 'pro',
  },
  {
    legMaxPerc: 60,
    legMaxOV: 900,
    id: 3,
    requiredPV: 100,
    requiredQOV: 1500,
    name: 'executive',
  },
  {
    legMaxPerc: 50,
    legMaxOV: 2250,
    id: 4,
    requiredPV: 100,
    requiredQOV: 4500,
    name: 'elite',
  },
  {
    legMaxPerc: 50,
    legMaxOV: 5000,
    id: 5,
    requiredPV: 100,
    requiredQOV: 10000,
    name: 'bronze',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 10000,
    id: 6,
    requiredPV: 200,
    requiredQOV: 25000,
    name: 'silver',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 20000,
    id: 7,
    requiredPV: 200,
    requiredQOV: 50000,
    name: 'gold',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 40000,
    id: 8,
    requiredPV: 200,
    requiredQOV: 100000,
    name: 'platinum',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 80000,
    id: 9,
    requiredPV: 200,
    requiredQOV: 200000,
    name: 'ruby',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 140000,
    id: 10,
    requiredPV: 200,
    requiredQOV: 350000,
    name: 'emerald',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 200000,
    id: 11,
    requiredPV: 200,
    requiredQOV: 500000,
    name: 'diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 300000,
    id: 12,
    requiredPV: 200,
    requiredQOV: 750000,
    name: 'blue-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 400000,
    id: 13,
    requiredPV: 200,
    requiredQOV: 1000000,
    name: 'black-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 600000,
    id: 14,
    requiredPV: 200,
    requiredQOV: 1500000,
    name: 'royal-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 800000,
    id: 15,
    requiredPV: 200,
    requiredQOV: 2000000,
    name: 'presidential-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOV: 1200000,
    id: 16,
    requiredPV: 200,
    requiredQOV: 3000000,
    name: 'crown-diamond',
  },
];
