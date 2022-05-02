import styled from 'styled-components/native';

export const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 2px;
`;

export const InvisibleUnderline = styled.View`
  height: 2px;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 5px;
  margin-bottom: 6px;
  align-self: flex-end;
`;

const standingsStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

export const StandingsContainer = styled.View`
  ${standingsStyle};
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-top-left-radius: 5px;
  height: 60%;
`;

export const CountContainer = styled.View`
  ${standingsStyle};
  background-color: ${(props) =>
    props.theme.leaderboardCountNumberBackgroundColor};
  border-bottom-left-radius: 5px;
  height: 36%;
`;

export const NameAndRankIconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 0 6px;
  justify-content: space-between;
`;

export const LegendIconRow = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;
