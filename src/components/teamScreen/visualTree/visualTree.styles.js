import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { DraxView } from 'react-native-drax';
import { TouchableOpacity } from 'react-native';
import { Flexbox } from '../../common';
import MoveIcon from '../../../../assets/icons/icMove.svg';

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
  flex-direction: row;
  flex-wrap: ${(props) => props.wrap};
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  /* there is some weird padding happening on the bubbles from the left side of -12px */
  padding-left: ${({ padding }) => (padding ? `${padding}px` : '12px')};
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
    props.highlight || props.selected ? props.theme.bubbleShadow : 'none'};
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

export const RoundButtonContainer = styled(Flexbox)`
  flex-direction: row;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 6px;
  margin-left: -12px;
  width: 100px;
`;

export const SkewedBorder = styled.View`
  height: 0;
  width: 0;
  border-bottom-color: ${(props) => props.theme.cardBackgroundColor};
  border-bottom-width: 36px;
  border-right-width: 24px;
`;

const roundButtonDiameter = 24;

const Round = styled.View`
  height: ${roundButtonDiameter}px;
  width: ${roundButtonDiameter}px;
  border-radius: ${roundButtonDiameter / 2}px;
  border-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-width: ${(props) =>
    props.hasContent && !props.selected ? '0px' : '1px'};
  background-color: ${(props) =>
    props.selected
      ? props.theme.primaryButtonBackgroundColor
      : props.hasContent
      ? props.theme.paneHasContentButtonBackgroundColor
      : 'transparent'};
`;

export const RoundButton = ({ selected, hasContent, ...props }) => (
  <TouchableOpacity {...props}>
    <Round selected={selected} hasContent={hasContent} />
  </TouchableOpacity>
);

RoundButton.propTypes = {
  selected: PropTypes.bool,
  hasContent: PropTypes.bool,
};

export const SearchBarNav = styled(Flexbox)`
  flex-direction: row;
  width: 100%;
  padding: 6px 0;
  min-height: 28px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;

export const MoveIconsContainer = styled(Flexbox)`
  flex-direction: row;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 0 6px;
  width: 100px;
`;

export const Button = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const MoveButton = ({ onPress, disabled, ...props }) => (
  <Button
    {...props}
    onPress={onPress}
    disabled={disabled}
    style={{
      transform: [{ rotate: '270deg' }],
    }}
  >
    <MoveIcon />
  </Button>
);

MoveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export const VisualTreeStatsBarCard = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  width: 200px;
  height: 100px;
  z-index: 200;
  border-radius: 5px;
  padding: 6px;
`;

const dimension = 24;
export const NumberToBePlaced = styled.View`
  background-color: ${(props) => props.theme.retailAvatarAccent};
  width: ${dimension}px;
  height: ${dimension}px;
  border-radius: ${dimension / 2}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 4px;
  z-index: 2;
  opacity: 0.65;
`;

export const PlacementCard = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  width: 200px;
  border-radius: 5px;
  padding: 6px;
`;
