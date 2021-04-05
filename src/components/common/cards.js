import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import baseImage from '../../../assets/icons/image.png';
import { H4 } from './texts';

// const sharedCss = {
//   flexGrow: 1,
//   paddingTop: 50,
//   paddingBottom: 40,
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: '100%',
// };

const CardContainer = styled.View`
  flex: ${(props) => (props.full ? '0 1 100%' : '0 1 49%')};
  height: 250px;
  margin-bottom: 10px;
  background-color: #0f0;
  border: 2px solid #0f0;
  border-radius: 40px;
`;

CardContainer.propTypes = {
  full: PropTypes.bool,
};

const CardImage = styled.Image.attrs((props) => ({
  source: props.source || baseImage,
}))`
  flex-basis: 75%;
  width: 100%;
  height: 100%;
`;

CardImage.propTypes = {
  source: PropTypes.string,
};

const CardFooter = styled.View`
  flex-basis: 25%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ccc;
`;

export const ResourcesCard = ({ ...props }) => (
  <CardContainer {...props}>
    <CardImage />
    <CardFooter>
      <H4>{props.title || 'Card Title'}</H4>
    </CardFooter>
  </CardContainer>
);

ResourcesCard.propTypes = {
  title: PropTypes.string,
};
