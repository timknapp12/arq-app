import styled from 'styled-components/native';
import { DraxView } from 'react-native-drax';

const innerCircleDiameter = 96;

export const OuterCircle = styled.View`
  margin: 20px 0;
  border-width: 2px;
  border-color: ${(props) => props.theme.cardBackgroundColor}
  padding: 0 12px 12px 12px;
  position: relative;
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

export const ReceivingCircle = styled(DraxView)`
  height: ${innerCircleDiameter + 8}px;
  width: ${innerCircleDiameter + 8}px;
  border-radius: ${innerCircleDiameter + 8 / 2}px;
  border-width: 3px;
  border-color: ${(props) => props.theme.disabledTextColor};
`;

const activityBadgeDiameter = 14;

export const ActivityBadge = styled.View`
  width: ${activityBadgeDiameter}px;
  height: ${activityBadgeDiameter}px;
  border-radius: ${activityBadgeDiameter + 8 / 2}px;
  background-color: green;
`;
