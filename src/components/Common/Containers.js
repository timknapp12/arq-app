import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  flex: 1,
  paddingTop: 10,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
};

export const ScreenContainer = styled.SafeAreaView`
  ${sharedCss};
  background-color: ${(props) => props.theme.backgroundColor};
`;

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
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <StyledView accessible={true} {...props}>
      {children}
    </StyledView>
  </TouchableWithoutFeedback>
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
