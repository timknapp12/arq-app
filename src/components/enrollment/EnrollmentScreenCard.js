import React from 'react';
import PropTypes from 'prop-types';
import { H5Secondary, Card, Gap, Flexbox } from '../common';

const EnrollmentScreenCard = ({ text, children }) => {
  return (
    <>
      <Gap height="12px" />
      <Card style={{ alignItems: 'center' }}>
        <Flexbox width="90%" padding={8}>
          <H5Secondary>{text}</H5Secondary>
          <Gap height="12px" />
          {children}
        </Flexbox>
      </Card>
    </>
  );
};

EnrollmentScreenCard.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default EnrollmentScreenCard;
