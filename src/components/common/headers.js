import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

const sharedCss = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
};

export const Header = styled.View`
  ${sharedCss};
  height: 37px;
  justify-content: space-between;
  padding: 0 12px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
`;

const SubContainer = styled.View`
  ${sharedCss};
  height: 35px;
  justify-content: center;
  padding: 0 18px;
  background-color: ${(props) => props.theme.subheaderBackgroundColor};
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

export const ButtonBar = styled.View`
  ${sharedCss};
  height: 36px;
  justify-content: space-between;
  padding: 0 12px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.topButtonBarBackground};
`;

export const TopButtonBar = ({ children }) => (
  <ButtonBar>
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'flex-end',
        minWidth: '100%',
      }}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  </ButtonBar>
);

TopButtonBar.propTypes = {
  children: PropTypes.any.isRequired,
};
