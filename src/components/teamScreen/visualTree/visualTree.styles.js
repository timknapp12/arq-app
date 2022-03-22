import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { DraxView } from 'react-native-drax';
import { TouchableOpacity } from 'react-native';

const bubbleDiameter = 96;

export const VisualTreeContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OuterCircle = styled(DraxView)`
  margin: 20px 0;
  border-width: 2px;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : props.theme.disabledTextColor};
  padding: 0 12px 12px 12px;
  position: relative;
`;

export const ReceivingCircle = styled(DraxView)`
  height: ${bubbleDiameter + 12}px;
  width: ${bubbleDiameter + 12}px;
  border-radius: ${bubbleDiameter + 12 / 2}px;
  border-width: 3px;
  border-color: ${(props) => props.borderColor};
  position: relative;
  justify-content: center;
  align-items: center;
`;

const bubbleStyle = {
  height: bubbleDiameter,
  width: bubbleDiameter,
  borderRadius: bubbleDiameter / 2,
  paddingTop: 4,
  justifyContent: 'space-around',
  alignItems: 'center',
};

export const Bubble = styled(DraxView)`
  ${bubbleStyle};
  margin-top: 8px;
  position: ${(props) => props.position};
  box-shadow: ${(props) =>
    props.highlight ? props.theme.bubbleShadow : 'none'};
  opacity: ${(props) => (props.isDroppedItem ? 0.5 : 1)};
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const RankPlaceholder = styled.View`
  height: 20px;
  width: 20px;
`;

export const LevelIndicator = styled.View`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  height: ${bubbleDiameter / 4}px;
  width: 100%;
  position: absolute;
  bottom: 0;
  opacity: 0.5;
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

export const VisualTreeStatsBarCard = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  width: 200px;
  height: 100px;
  z-index: 200;
  border-radius: 5px;
  padding: 6px;
`;
