import styled from 'styled-components/native';

// Font families:
// 'Roboto-Regular'
// 'Nunito-Black'
// 'Nunito-Regular'

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

export const H1 = styled.Text`
  font-size: 36px;
  color: ${(props) => props.theme.color};
`;

export const H2 = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 24px;
  color: ${(props) => props.theme.color};
`;

export const H3 = styled.Text`
  font-size: 21px;
  color: ${(props) => props.theme.color};
`;

export const H4 = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H5 = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const H6 = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;

export const AlertText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.error};
`;
