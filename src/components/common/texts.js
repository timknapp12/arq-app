import styled from 'styled-components/native';
import { blue } from '../../styles/colors';

// Font families:
// 'Roboto-Regular'
// 'Nunito-Black'
// 'Nunito-Regular'
// 'Nunito-Light'

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

export const H1 = styled.Text`
  font-size: 36px;
  color: ${(props) => props.theme.color};
`;

export const H2Bold = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 24px;
  color: ${(props) => props.theme.color};
`;

export const H2Normal = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 24px;
  color: ${(props) => props.theme.color};
`;

export const H3 = styled.Text`
  font-size: 21px;
  color: ${(props) => props.theme.color};
`;

export const H3Bold = styled.Text`
  font-family: 'Nunito-Black';
  letter-spacing: 1.51px;
  font-size: 21px;
  color: ${(props) => props.theme.color};
`;

export const H4 = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H4Bold = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H4BoldSecondary = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 18px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H4Secondary = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 18px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H5 = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const H5Secondary = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 16px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H6 = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;

export const H6Secodnary = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 14px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const Checkmark = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 12px;
  color: ${(props) => props.theme.color};
`;

export const AlertText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${(props) => props.theme.error};
`;

export const Link = styled.Text`
  font-family: 'Nunito-Black';
  color: ${blue};
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: ${blue};
  line-height: 19px;
`;
