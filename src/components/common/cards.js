import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import baseImage from '../../../assets/icons/image.png';
import { H6 } from './texts';

// RESOURCES CARD
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
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 8px;
`;

export const ResourcesCard = ({
  source,
  isLayoutWide,
  title,
  onPress,
  ...props
}) => (
  <CardContainer isLayoutWide={isLayoutWide} {...props}>
    <TouchableOpacity onPress={onPress}>
      <CardImage source={{ uri: source }} defaultSource={baseImage} />
      <CardFooter>
        <H6>{title}</H6>
      </CardFooter>
    </TouchableOpacity>
  </CardContainer>
);

ResourcesCard.propTypes = {
  title: PropTypes.string,
  isLayoutWide: PropTypes.bool,
  source: PropTypes.string,
  onPress: PropTypes.func,
};

// ASSET CARD
const AssetContainer = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;

export const AssetCard = ({ title, ...props }) => (
  <AssetContainer {...props}>
    <H6>{title}</H6>
  </AssetContainer>
);

AssetCard.propTypes = {
  title: PropTypes.string,
};
