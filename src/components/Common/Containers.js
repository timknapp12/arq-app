import styled from 'styled-components/native';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  flex: 1,
  paddingTop: 60,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
};

export const ScreenContainer = styled.View`
  ${sharedCss};
  background-color: ${(props) => props.theme.backgroundColor};
`;
