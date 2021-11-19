import styled from 'styled-components/native';

export const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 2px;
`;

export const InvisibleUnderline = styled.View`
  height: 2px;
`;

export const CardContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  align-self: flex-end;
  /* flex-direction: row; */
`;

export const StandingsContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 100%;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-top-left-radius: 5px;
  border-bottom-left-radius: ${({ isExpanded }) => (isExpanded ? 0 : '5px')};
  border-bottom-right-radius: ${({ isExpanded }) => (isExpanded ? '5px' : 0)};
`;
