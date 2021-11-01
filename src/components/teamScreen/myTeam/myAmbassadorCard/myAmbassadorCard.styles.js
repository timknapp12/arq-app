import styled from 'styled-components/native';

// used in MyAmbassadorCard.js
export const CardContainer = styled.View`
  width: ${(props) => (props.indent ? '95%' : '100%')};
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  align-self: flex-end;
`;

export const ZoomContainer = styled.View`
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  width: 60px;
  height: 64px;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  margin-left: 8px;
`;

export const ZoomContainerDivider = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 3px;
  width: 100%;
`;

export const ZoomIconButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// used in DownlineProfileInfo.js
const diameter = 48;

const imageDimensions = {
  width: diameter,
  height: diameter,
  borderRadius: diameter / 2,
};

export const ThumbnailImage = styled.Image`
  ${imageDimensions};
`;

export const DefaultThumbnailBackground = styled.View`
  ${imageDimensions};
  background-color: ${(props) => props.theme.disabledTextColor};
  justify-content: center;
  align-items: center;
`;

export const LevelIndicatorContainer = styled.View`
  ${imageDimensions};
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0px;
  overflow: hidden;
`;

export const LevelIndicator = styled.View`
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  height: ${diameter / 3}px;
  width: 100%;
`;

export const ProfileInfoTouchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

export const NameAndRankContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin: 0 4px;
`;

export const DonutAndOrdersContainer = styled.View`
  min-height: 400px;
  width: 100%;
`;

// used in MyAmbassadorExpandedInfo.js
export const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 2px;
`;

export const InvisibleUnderline = styled.View`
  height: 2px;
`;

// used in MyAmbassadorOrdersContainer.js
const flex = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  width: '90%',
};

export const OrderTableHeaderRow = styled.View`
  ${flex};
  margin: 0 4px;
`;

export const OrderTableRow = styled.View`
  ${flex};
  border-bottom-color: ${(props) => props.theme.secondaryTextColor};
  border-bottom-width: 1px;
  margin: 0 4px;
`;
