import styled from 'styled-components/native';

export const pieWidth = 200;
export const pieHeight = 240;

const innerCircleHeight = 166;
const innerCirlceBorderRadius = innerCircleHeight / 2;

// this in case all values of the pie are zero, so a chart still appears
const defaultPieDim = 192;
export const DefaultPie = styled.View`
  width: ${defaultPieDim}px;
  height: ${defaultPieDim}px;
  border-radius: ${defaultPieDim / 2}px;
  background-color: ${(props) => props.color};
  position: absolute;
  top: 24px;
  left: 4px;
`;

export const PieHole = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  height: ${innerCircleHeight}px;
  width: ${innerCircleHeight}px;
  border-radius: ${innerCirlceBorderRadius}px;
  position: absolute;
  top: 37px;
  left: 17px;
`;

export const PieHoleText = styled.Text`
  font-size: 21px;
  font-family: 'Avenir-Heavy';
  color: ${(props) =>
    props.color ? props.color : props.theme.primaryTextColor};
`;

export const ThemedCard = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: ${(props) =>
    props.selected ? `solid 1px ${props.theme.selectedCardHighlight}` : null};
`;

export const ChevronContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
