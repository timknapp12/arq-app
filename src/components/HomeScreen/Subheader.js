import React from 'react';
import styled from 'styled-components/native';

//TODO = storybook

const Container = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: ${(props) => props.theme.inactiveBackground};
`;

const PlaceholderTxt = styled.Text`
  color: white;
`;

const Subheader = () => {
  return (
    <Container>
      <PlaceholderTxt>Overview</PlaceholderTxt>
      <PlaceholderTxt>Rank</PlaceholderTxt>
      <PlaceholderTxt>OV Detail</PlaceholderTxt>
    </Container>
  );
};

export default Subheader;
