import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

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
  padding: 0 0 0 6px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleAndDescription = styled.View`
  flex: 1;
  padding: 4px 0;
`;

export const IconColumn = styled.View`
  height: 50px;
  justify-content: space-between;
  padding: 0 6px 0 12px;
  align-items: flex-end;
`;
