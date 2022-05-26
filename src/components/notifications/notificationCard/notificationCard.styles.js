import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: 100%;
`;

export const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-left-color: ${(props) =>
    props.isReadYet
      ? `${props.theme.highlight}`
      : `${props.theme.cardBackgroundColor}`};
  border-left-width: 6px;
  padding: 8px 16px;
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: 95px;
  height: ${(props) => (props.isExpanded ? 'auto' : '95px')};
  overflow: hidden;
`;

export const InnerContainer = styled.TouchableOpacity`
  flex: ${(props) => (props.isExpanded ? 'none' : 1)};
  padding: 4px 12px 4px 4px;
  width: 100%;
`;

export const TitleAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const IconColumn = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 32px;
  position: absolute;
  top: 8px;
  right: 0;
`;

export const IconRow = styled.View`
  flex-direction: row;
  flex: ${(props) => (props.isExpanded ? 1 : 'none')};
  justify-content: flex-end;
  align-items: center;
`;
