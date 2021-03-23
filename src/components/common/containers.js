import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  flexGrow: 1,
  paddingTop: 50,
  paddingBottom: 40,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const ThemedScreenContainer = styled.SafeAreaView`
  ${sharedCss};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const ScreenContainer = ({ children, ...props }) => (
  <ThemedScreenContainer accessible={true} {...props}>
    {children}
  </ThemedScreenContainer>
);

ScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

// Flexbox
const StyledView = styled.View`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : 'space-between')};
  align-items: ${({ align }) => (align ? align : 'center')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  padding: ${({ padding }) => (padding ? `${padding}px` : '0px')};
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
`;

export const Flexbox = ({ children, ...props }) => (
  <StyledView accessible={true} {...props}>
    {children}
  </StyledView>
);

Flexbox.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  direction: PropTypes.string,
};
