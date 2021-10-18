import React from 'react';
import { View } from 'react-native';
import PieChart from './PieChart';
import CardForAtAGlance from './CardForAtAGlance';
import { Gap } from '../../common';
import { Localized } from '../../../translations/Localized';

const data = [
  {
    name: 'Leg 1',
    population: 362323,
    color: '#94D2BA',
    legendFontColor: 'rgba(255,255,255,.83)',
    legendFontSize: 15,
  },
  {
    name: 'Leg 2',
    population: 203366,
    color: '#EAB286',
    legendFontColor: 'rgba(255,255,255,.83)',
    legendFontSize: 15,
  },
  {
    name: 'Leg 3',
    population: 102555,
    color: '#B6A0BB',
    legendFontColor: 'rgba(255,255,255,.83)',
    legendFontSize: 15,
    legendFontFamily: 'Avenir-Light',
  },
];

// const data = []

const AtAGlanceView = ({ ...props }) => {
  return (
    <View {...props}>
      <PieChart data={data || []} accessor="population" />
      <CardForAtAGlance title={Localized('Autoships')} value="688244" />
      <Gap height="12px" />
      <CardForAtAGlance />
    </View>
  );
};

export default AtAGlanceView;
