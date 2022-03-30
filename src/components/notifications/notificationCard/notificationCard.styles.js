import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  margin-bottom: 4px;
  min-height: 100px;
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
