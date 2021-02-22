import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import {
  H2Normal,
  Flexbox,
  SmallQIcon,
  BellIcon,
  AccountIcon,
} from '../Common';

const DashboardHeader = ({ badgeValue }) => {
  return (
    <Header>
      <SmallQIcon />
      <H2Normal>Business</H2Normal>
      <Flexbox width="60px" direction="row">
        <BellIcon badgeValue={badgeValue} />
        <AccountIcon />
      </Flexbox>
    </Header>
  );
};

DashboardHeader.propTypes = {
  badgeValue: PropTypes.number,
};

export default DashboardHeader;
