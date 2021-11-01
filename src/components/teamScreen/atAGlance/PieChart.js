import React from 'react';
import PropTypes from 'prop-types';
import { H5, Flexbox } from '../../common';
import { PieChart as Pie } from 'react-native-chart-kit';
import { Localized } from '../../../translations/Localized';
import { pieWidth, pieHeight, PieHole, PieHoleText } from './atAGlance.styles';

// source for pie chart https://www.npmjs.com/package/react-native-chart-kit
const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const PieChart = ({ data = [], accessor }) => {
  const pieTextColor = data?.[0]?.color;
  if (data?.length < 1) {
    return (
      <Flexbox style={{ width: 320, height: 220 }}>
        <H5 style={{ color: 'white' }}>
          {Localized(
            'We had a problem retrieving your data. Please try again later',
          )}
        </H5>
      </Flexbox>
    );
  }
  return (
    <Flexbox>
      <Pie
        data={data}
        width={pieWidth}
        height={pieHeight}
        chartConfig={chartConfig}
        accessor={accessor}
        backgroundColor="transparent"
        paddingLeft="15"
        paddingRight="15"
      />
      <PieHole>
        <PieHoleText color={pieTextColor}>
          {(688244).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </PieHoleText>
        <PieHoleText color={pieTextColor}>{Localized('of')}</PieHoleText>
        <PieHoleText color={pieTextColor}>
          {(1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </PieHoleText>
      </PieHole>
    </Flexbox>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  accessor: PropTypes.string.isRequired,
};

export default PieChart;
