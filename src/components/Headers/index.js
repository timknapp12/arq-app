import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 37px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
`;

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
