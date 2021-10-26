import React from 'react';
import PropTypes from 'prop-types';
import { H5Black, Flexbox, Gap } from '../../common';

const PieLegend = ({ data }) => {
  return (
    <Flexbox style={{ flex: 1 }}>
      <H5Black>Leg 1</H5Black>
      <H5Black style={{ color: data[0].color }}>
        {data[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </H5Black>
      <Gap height="16px" />
      <H5Black>Leg 2</H5Black>
      <H5Black style={{ color: data[1].color }}>
        {data[1].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </H5Black>
      <Gap height="16px" />
      <H5Black>Leg 3</H5Black>
      <H5Black style={{ color: data[2].color }}>
        {data[2].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </H5Black>
    </Flexbox>
  );
};

PieLegend.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PieLegend;
