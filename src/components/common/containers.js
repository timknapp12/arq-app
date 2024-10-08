import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

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
  children: PropTypes.node,
  padding: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  direction: PropTypes.string,
};

export const MainScrollView = ({ children, paddingBottom = 240, ...props }) => (
  <ScrollView
    {...props}
    contentContainerStyle={{
      flexGrow: 1,
      paddingBottom,
    }}
    style={{
      width: '100%',
      height: '100%',
      zIndex: -1,
    }}
  >
    {children}
  </ScrollView>
);

MainScrollView.propTypes = {
  children: PropTypes.any,
  paddingBottom: PropTypes.number,
};

export const Gap = styled.View`
  height: ${(props) => (props.height ? props.height : '20px')};
`;

export const Card = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 6px;
  border-radius: 5px;
  width: 100%;
`;

export const SideMenu = styled.View`
  z-index: 2;
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.sideMenuBackground};
  padding: 18px;
`;
