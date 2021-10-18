import styled from 'styled-components/native';

export const pieWidth = 320;
export const pieHeight = 220;

const innerCircleHeight = 150;
const innerCirlceBorderRadius = innerCircleHeight / 2;

export const PieHole = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  height: ${innerCircleHeight}px;
  width: ${innerCircleHeight}px;
  border-radius: ${innerCirlceBorderRadius}px;
  position: absolute;
  top: 35px;
  left: 20px;
`;

export const PieHoleText = styled.Text`
  font-size: 21px;
  font-family: 'Avenir-Heavy';
  color: ${(props) =>
    props.color ? props.color : props.theme.primaryTextColor};
`;

export const ThemedCard = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;
