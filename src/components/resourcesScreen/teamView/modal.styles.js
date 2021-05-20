import styled from 'styled-components/native';
import { Label } from '../../common';

export const imageHeight = 76;
export const squareImageWidth = imageHeight;
export const rectangleImageWidth = imageHeight * 2;

export const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 3px;
`;

export const Filename = styled(Label)`
  opacity: 0.83;
`;

export const FileInput = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 0 0 4px;
`;

export const FileUnderline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) =>
    props.focused ? props.theme.highlight : props.theme.disabledTextColor};
  border-bottom-width: ${(props) => (props.focused ? '3px' : '1px')};
`;

export const MiniCard = styled.View`
  height: 96px;
`;

export const Footer = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  height: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  flex: 1;
  font-family: 'Avenir-Heavy';
  font-size: 10px;
  opacity: 0.83;
  color: ${(props) => props.theme.primaryTextColor};
  padding: 2px;
`;

export const DefaultSquareImage = styled.View`
  background-color: ${(props) => props.theme.disabledBackgroundColor};
  height: ${imageHeight}px;
  width: ${squareImageWidth}px;
`;

export const DefaultRectangleImage = styled.View`
  background-color: ${(props) => props.theme.disabledBackgroundColor};
  height: ${imageHeight}px;
  width: ${rectangleImageWidth}px;
`;

export const marginSize = 8;
