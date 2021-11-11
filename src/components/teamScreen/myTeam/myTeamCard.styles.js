import styled from 'styled-components/native';
import { H6 } from '../../common';

// used in MyAmbassadorCard.js
export const CardContainer = styled.View`
  width: ${(props) => (props.nested ? '95%' : '100%')};
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  align-self: flex-end;
`;

export const ZoomContainer = styled.View`
  width: 60px;
  height: 64px;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  margin-left: 8px;
`;

export const ZoomInTouchableOpacity = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledTextColor
      : props.theme.primaryButtonBackgroundColor};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
  width: 100%;
  height: 29px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const ZoomOutTouchableOpacity = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledTextColor
      : props.theme.primaryButtonBackgroundColor};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
  width: 100%;
  height: 29px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  height: ${diameter / 3}px;
  width: 100%;
`;

export const TouchableRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

export const NameAndRankContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin: 0 4px;
`;

export const ChevronContainer = styled.View`
  height: 26px;
  position: absolute;
  top: 0;
  right: 0;
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

// used in OrdersContainer.js
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
  width: 100%;
  border-bottom-color: ${(props) => props.theme.secondaryTextColor};
  border-bottom-width: 1px;
  margin: 0 4px;
`;

// in OrderHistoryCardHeader.js
// the min-width on this component is to avoid its children text from wrapping
export const HorizontalScrollViewCell = styled.View`
  flex-direction: row;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '20%')};
  justify-content: ${({ justify }) => (justify ? justify : 'flex-end')};
`;

// In OrderHistoryCard.js
export const OrderDetailsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-color: ${(props) => props.theme.secondaryTextColor};
  border-bottom-width: 1px;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 8px;
`;

export const OrderDetailTitleContainer = styled.View`
  width: 40%;
`;

export const OrderDetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

export const H6RightMargin = styled(H6)`
  margin-right: 8px;
`;
