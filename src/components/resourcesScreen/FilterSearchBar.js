import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import AppContext from '../../contexts/AppContext';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  z-index: -1;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
`;

const FilterSearchBar = ({ children }) => {
  const { theme } = useContext(AppContext);
  return (
    <Container>
      {children}
      <SearchIcon
        style={{ height: 36, width: 36, color: theme.primaryTextColor }}
      />
    </Container>
  );
};

FilterSearchBar.propTypes = {
  children: PropTypes.any,
};

export default FilterSearchBar;
