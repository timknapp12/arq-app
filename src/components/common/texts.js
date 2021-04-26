import styled from 'styled-components/native';
import { blue } from '../../styles/colors';

// Font families:
// Roboto-Regular
// Avenir-Light
// Avenir-Book
// Avenir-Heavy
// Avenir-Black

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
const primaryOpacity = { opacity: 0.83 };
const secondaryOpacity = { opacity: 0.5 };
// const disabledOpacity = { opacity: 0.35 };

export const H2 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 24px;
  color: ${(props) => props.theme.color};
`;

export const H3 = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 21px;
  color: ${(props) => props.theme.color};
`;

export const H4 = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H4Secondary = styled.Text`
  ${secondaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H4Heavy = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Heavy';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H4Book = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Book';
  font-size: 18px;
  color: ${(props) => props.theme.color};
`;

export const H5 = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const H5Secondary = styled.Text`
  ${secondaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const H5Heavy = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Heavy';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const H5Black = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Black';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

export const Label = styled.Text`
  ${secondaryOpacity};
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.color};
`;

export const H6 = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;

export const H6Secodnary = styled.Text`
  ${secondaryOpacity};
  font-family: 'Avenir-Light';
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;

export const H6Book = styled.Text`
  ${primaryOpacity};
  font-family: 'Avenir-Book';
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;

export const Checkmark = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 12px;
  color: ${(props) => props.theme.color};
`;

export const AlertText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: ${(props) => props.theme.error};
`;

export const Link = styled.Text`
  font-family: 'Avenir-Heavy';
  color: ${blue};
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: ${blue};
  line-height: 19px;
`;
