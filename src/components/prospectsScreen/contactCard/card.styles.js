import styled from 'styled-components/native';

const smallImageWidth = 48;

const smallImage = {
  height: smallImageWidth,
  width: smallImageWidth,
  borderRadius: smallImageWidth / 2,
  alignSelf: 'center',
};

export const CardContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Stack = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
  margin: 0 12px;
`;

export const CollapsedImage = styled.Image`
  ${smallImage};
`;

export const CollapsedImageDefault = styled.View`
  ${smallImage};
  background-color: ${(props) => props.theme.disabledTextColor};
  justify-content: center;
  align-items: center;
`;

export const IconColumn = styled.View`
  justify-content: space-between;
  align-items: center;
`;
