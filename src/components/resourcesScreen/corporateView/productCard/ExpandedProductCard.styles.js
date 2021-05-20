import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 6px 0;
  border-radius: 5px;
  margin-bottom: 10px;
  height: ${(props) => (props.isExpanded ? 'auto' : '60px')};
  overflow: hidden;
`;

export const InnerContainer = styled.View`
  width: 100%;
  padding: 0 6px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ImageAndIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  display: ${(props) => (props.isExpanded ? 'flex' : 'none')};
`;

export const IconRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const assetIconContainerWidth = 45;
const smallerImageWidth = width - assetIconContainerWidth - 40;
export const smallerImageHeight = smallerImageWidth / 2;

export const AssetIconContainer = styled.View`
  width: ${assetIconContainerWidth}px;
  align-items: flex-end;
`;

export const TitleAndDescription = styled.View`
  flex: 1;
  padding: 4px 0;
`;
