import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H4 } from './Texts';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const InvertedH4 = styled(H4)`
  color: ${(props) => props.theme.invertedColor};
  text-align: center;
`;

const ThemedPrimaryButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.color};
  padding: 8px;
  width: 100%;
`;

export const PrimaryButton = ({ children = 'Button', ...props }) => (
  <ThemedPrimaryButton {...props}>
    <InvertedH4>{children}</InvertedH4>
  </ThemedPrimaryButton>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};
