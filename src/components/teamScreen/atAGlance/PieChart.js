import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { H5, Flexbox } from '../../common';
import { PieChart as Pie } from 'react-native-chart-kit';
import { Localized } from '../../../translations/Localized';
import PieLegend from './PieLegend';
import {
  pieWidth,
  pieHeight,
  PieHole,
  PieHoleText,
  DefaultPie,
} from './atAGlance.styles';
import { TouchableWithoutFeedback } from 'react-native';

// source for pie chart https://www.npmjs.com/package/react-native-chart-kit
const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const PieChart = ({
  data = [],
  accessor = 'value',
  firstTotal,
  secondTotal,
  closeMenus,
}) => {
  const [showDefaultPie, setShowDefaultPie] = useState(false);
  const pieTextColor = data?.[0]?.color;

  const [leg1, leg2, leg3] = data;

  // the pie from react-native-chart-kit shows no chart if all values are zero, so here we determine if they are all zero, and if so, we show a default pie chart
  const seeIfAllValuesAreZero = () => {
    return leg1?.value <= 0 && leg2?.value <= 0 && leg3?.value <= 0;
  };

  useEffect(() => {
    if (data) {
      setShowDefaultPie(seeIfAllValuesAreZero);
    }
    return () => {
      setShowDefaultPie(false);
    };
  }, [data]);

  if (data?.length < 1) {
    return (
      <Flexbox style={{ width: 320, height: 220 }}>
        <H5 style={{ textAlign: 'center' }}>
          {Localized(
            'We had a problem retrieving your data. Please try again later',
          )}
        </H5>
      </Flexbox>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <Flexbox justify="flex-start" direction="row">
        <Pie
          data={data}
          width={pieWidth}
          height={pieHeight}
          chartConfig={chartConfig}
          accessor={accessor}
          backgroundColor="transparent"
          paddingLeft="50"
          hasLegend={false}
        />
        {showDefaultPie && <DefaultPie />}
        <PieHole>
          <PieHoleText color={pieTextColor}>
            {firstTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </PieHoleText>
          {secondTotal ? (
            <PieHoleText color={pieTextColor}>{Localized('of')}</PieHoleText>
          ) : null}
          {secondTotal ? (
            <PieHoleText color={pieTextColor}>
              {secondTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </PieHoleText>
          ) : null}
        </PieHole>
        <PieLegend data={data} />
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  accessor: PropTypes.string.isRequired,
  firstTotal: PropTypes.number.isRequired,
  secondTotal: PropTypes.number,
  closeMenus: PropTypes.func.isRequired,
};

export default PieChart;
