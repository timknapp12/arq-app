import styled from 'styled-components/native';
import { blue } from '../../styles/colors';

// Font families:
// Roboto-Regular
// Avenir-Light
// Avenir-Book
// Avenir-Heavy
// Avenir-Black
// Helvetica

// source for themes with styled components: https://styled-components.com/docs/advanced#theming
export const H2 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 24px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H2Book = styled.Text`
  font-family: 'Avenir-Book';
  font-size: 24px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H2Black = styled.Text`
  font-family: 'Avenir-Black';
  font-size: 24px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H2Heavy = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 24px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H3 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 21px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H4 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H4Secondary = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 18px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H4Heavy = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H4Book = styled.Text`
  font-family: 'Avenir-Book';
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H4Black = styled.Text`
  font-family: 'Avenir-Black';
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H5 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 16px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H5Secondary = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 16px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H5Heavy = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 16px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H5Black = styled.Text`
  font-family: 'Avenir-Black';
  font-size: 16px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H6 = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 14px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const H6Secondary = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 14px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const H6Book = styled.Text`
  font-family: 'Avenir-Book';
  font-size: 14px;
  color: ${(props) => props.theme.primaryTextColor};
`;

export const Checkmark = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 12px;
  color: ${(props) => props.theme.primaryTextColor};
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
  text-decoration-color: ${blue};
  line-height: 19px;
`;

export const LevelLabel = styled.Text`
  font-family: 'Avenir-Black';
  font-size: 10px;
  color: ${(props) => props.theme.primaryTextColor};
`;
