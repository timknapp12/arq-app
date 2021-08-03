import styled from 'styled-components/native';

export const ColumnContainer = styled.View`
  padding: 0px;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  position: absolute;
`;

export const ClearButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 12px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-width: 2px;
  border-top-color: ${(props) => props.theme.backgroundColor};
  position: relative;
  z-index: -1;
`;

export const NotificationBottomPadding = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  border-bottom-width: 6px;
  border-color: ${(props) => props.theme.cardBackgroundColor};
  height: 100px;
  margin-bottom: 2px;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
`;

export const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  margin-bottom: 2px;
  /* border-left-color: ${(props) => props.theme.highlight};
  border-left-width: ${(props) => (props.isStillNew ? '6px' : '0px')};
  padding: 4px 8px 4px 8px;
  padding-left: ${(props) => (props.isStillNew ? '10px' : '16px')}; */
  /* height: ${(props) => (props.isExpanded ? '130px' : '60px')};
  overflow: hidden; */
`;

export const Row = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 16px 12px 4px 12px;
  align-items: center;
`;

export const InnerContainer = styled.View`
  justify-content: flex-start;
  width: 100%;
`;

export const TitleAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const IconColumn = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const IconRow = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
