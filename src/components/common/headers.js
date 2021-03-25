import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 37px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
`;

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Header };

const SubContainer = styled.View`
  width: 100%;
  height: ${(props) => props.height};
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.justify ? props.justify : 'space-between'};
  padding: 0 18px;
  background-color: ${(props) => props.theme.inactiveBackground};
`;

const Subheader = ({ children, justify, height = '35px', ...props }) => {
  return (
    <SubContainer {...props} justify={justify} height={height}>
      {children}
    </SubContainer>
  );
};

Subheader.propTypes = {
  children: PropTypes.node,
  justify: PropTypes.string,
  height: PropTypes.string,
};

export { Subheader };
