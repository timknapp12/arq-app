import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  flex: 1,
  paddingTop: 40,
  paddingBottom: 40,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
};

const ThemedScreenContainer = styled.SafeAreaView`
  ${sharedCss};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const ScreenContainer = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedScreenContainer accessible={true} {...props}>
      {children}
    </ThemedScreenContainer>
  </TouchableWithoutFeedback>
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
