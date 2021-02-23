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
import { Localized, init } from '../../Translations/Localized';

const DashboardHeader = ({ badgeValue }) => {
  init();
  return (
    <Header>
      <Flexbox width="60px" align="flex-start">
        <SmallQIcon />
      </Flexbox>
      <H2Normal>{Localized('business')}</H2Normal>
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
