import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H4 } from './Texts';

const ThemedPrimaryButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const PrimaryButton = ({ children = 'Button', ...props }) => (
  <ThemedPrimaryButton {...props}>
    <H4>{children}</H4>
  </ThemedPrimaryButton>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};
