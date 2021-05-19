import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: 100%;
`;

export const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-left-color: ${(props) => props.theme.highlight};
  border-left-width: ${(props) => (props.isStillNew ? '6px' : '0px')};
  padding: 8px 20px 8px 16px;
  padding-left: ${(props) => (props.isStillNew ? '10px' : '16px')};
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: 95px;
  height: ${(props) => (props.isExpanded ? 'auto' : '95px')};
  overflow: hidden;
`;

export const InnerContainer = styled.View`
  flex: 1;
  padding: 4px 0;
`;

export const TitleAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
