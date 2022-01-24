import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { DraxView } from 'react-native-drax';
import { TouchableOpacity } from 'react-native';

const innerCircleDiameter = 96;

export const OuterCircle = styled(DraxView)`
  margin: 20px 0;
  border-width: 2px;
  border-color: ${(props) => props.borderColor};
  padding: 0 12px 12px 12px;
  position: relative;
`;

export const ReceivingCircle = styled(DraxView)`
  height: ${innerCircleDiameter + 12}px;
  width: ${innerCircleDiameter + 12}px;
  border-radius: ${innerCircleDiameter + 12 / 2}px;
  border-width: 3px;
  border-color: ${(props) => props.borderColor};
`;

export const innerCircleDimensions = {
  height: innerCircleDiameter,
  width: innerCircleDiameter,
  borderRadius: innerCircleDiameter / 2,
  paddingTop: 4,
  justifyContent: 'space-around',
  alignItems: 'center',
};

export const InnerCircle = styled(DraxView)`
  ${innerCircleDimensions};
  margin-top: 10px;
  position: absolute;
`;

export const LevelIndicator = styled.View`
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  height: ${innerCircleDiameter / 4}px;
  width: 100%;
  position: absolute;
  bottom: 0;
  opacity: 0.5;
`;

const activityBadgeDiameter = 14;

export const ActivityBadge = styled.View`
  width: ${activityBadgeDiameter}px;
  height: ${activityBadgeDiameter}px;
  border-radius: ${activityBadgeDiameter + 8 / 2}px;
  background-color: green;
`;

const roundButtonDiameter = 24;

const Round = styled.View`
  height: ${roundButtonDiameter}px;
  width: ${roundButtonDiameter}px;
  border-radius: ${roundButtonDiameter / 2}px;
  border-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-width: 1px;
  background-color: ${(props) =>
    props.selected ? props.theme.primaryButtonBackgroundColor : 'transparent'};
`;

export const RoundButton = ({ selected, ...props }) => (
  <TouchableOpacity {...props}>
    <Round selected={selected} />
  </TouchableOpacity>
);

RoundButton.propTypes = {
  selected: PropTypes.bool,
};
