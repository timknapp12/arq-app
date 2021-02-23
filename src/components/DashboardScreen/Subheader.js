import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background-color: ${(props) => props.theme.inactiveBackground};
`;

const Subheader = ({ children }) => {
  return <Container>{children}</Container>;
};

Subheader.propTypes = {
  children: PropTypes.node,
};

export default Subheader;
