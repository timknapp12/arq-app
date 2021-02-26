import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer, H5 } from '../../src/components/Common';
import Slider from '../../src/components/DashboardScreen/Slider';

const Example = () => {
  const initialRankName = 'pro';
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    id: 2,
    requiredPv: 100,
    requiredQov: 600,
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
      <H5>{`Required OV: ${rank.requiredQov}`}</H5>
      <H5>{`Leg Max Percentage: ${rank.legMaxPerc}`}</H5>
      <H5>{`Leg Max OV: ${rank.legMaxOv}`}</H5>
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
    legMaxOv: 0,
    id: 0,
    requiredPv: 0,
    requiredQov: 0,
    name: 'distributor',
  },
  {
    legMaxPerc: 60,
    legMaxOv: 180,
    id: 1,
    requiredPv: 100,
    requiredQov: 300,
    name: 'builder',
  },
  {
    legMaxPerc: 60,
    legMaxOv: 360,
    id: 2,
    requiredPv: 100,
    requiredQov: 600,
    name: 'pro',
  },
  {
    legMaxPerc: 60,
    legMaxOv: 900,
    id: 3,
    requiredPv: 100,
    requiredQov: 1500,
    name: 'executive',
  },
  {
    legMaxPerc: 50,
    legMaxOv: 2250,
    id: 4,
    requiredPv: 100,
    requiredQov: 4500,
    name: 'elite',
  },
  {
    legMaxPerc: 50,
    legMaxOv: 5000,
    id: 5,
    requiredPv: 100,
    requiredQov: 10000,
    name: 'bronze',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 10000,
    id: 6,
    requiredPv: 200,
    requiredQov: 25000,
    name: 'silver',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 20000,
    id: 7,
    requiredPv: 200,
    requiredQov: 50000,
    name: 'gold',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 40000,
    id: 8,
    requiredPv: 200,
    requiredQov: 100000,
    name: 'platinum',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 80000,
    id: 9,
    requiredPv: 200,
    requiredQov: 200000,
    name: 'ruby',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 140000,
    id: 10,
    requiredPv: 200,
    requiredQov: 350000,
    name: 'emerald',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 200000,
    id: 11,
    requiredPv: 200,
    requiredQov: 500000,
    name: 'diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 300000,
    id: 12,
    requiredPv: 200,
    requiredQov: 750000,
    name: 'blue-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 400000,
    id: 13,
    requiredPv: 200,
    requiredQov: 1000000,
    name: 'black-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 600000,
    id: 14,
    requiredPv: 200,
    requiredQov: 1500000,
    name: 'royal-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 800000,
    id: 15,
    requiredPv: 200,
    requiredQov: 2000000,
    name: 'presidential-diamond',
  },
  {
    legMaxPerc: 40,
    legMaxOv: 1200000,
    id: 16,
    requiredPv: 200,
    requiredQov: 3000000,
    name: 'crown-diamond',
  },
];
