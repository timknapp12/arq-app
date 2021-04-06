import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import baseImage from '../../../assets/icons/image.png';
import { H4 } from './texts';

const containerHeight = 224;
const footerHeight = 48;

const CardContainer = styled.View`
  flex: ${(props) => (props.isLayoutWide ? '0 1 100%' : '0 1 48%')};
  height: ${containerHeight}px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

CardContainer.propTypes = {
  isLayoutWide: PropTypes.bool,
};

const CardImage = styled.Image`
  height: ${containerHeight - footerHeight}px;
`;

const CardFooter = styled.View`
  height: ${footerHeight}px;
  flex-basis: 25%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ccc;
`;

export const ResourcesCard = ({ source, isLayoutWide, ...props }) => (
  <CardContainer isLayoutWide={isLayoutWide} {...props}>
    <CardImage source={{ uri: source }} defaultSource={baseImage} />
    <CardFooter>
      <H4>{props.title || 'Card Title'}</H4>
    </CardFooter>
  </CardContainer>
);

ResourcesCard.propTypes = {
  title: PropTypes.string,
  isLayoutWide: PropTypes.bool,
  source: PropTypes.string,
};
