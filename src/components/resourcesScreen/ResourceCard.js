import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import baseImage from '../../../assets/icons/image.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AppContext from '../../contexts/AppContext';
import { H6, H4Book, Flexbox } from '../common';

const containerHeight = 224;
const footerHeight = 48;

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const CardContainer = styled.View`
  flex: ${(props) => (props.isWideLayout ? '0 1 100%' : '0 1 48%')};
  /* height: ${containerHeight}px; */
  margin-bottom: 20px;
  border-radius: 5px;
`;

CardContainer.propTypes = {
  isWideLayout: PropTypes.bool,
};

const CardImage = styled.Image`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* max-width: 100%; */
  height: ${imageHeight}px;
`;

const CardFooter = styled.View`
  height: ${footerHeight}px;
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

const ResourceCallout = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: ${containerHeight}px;
`;

const ResourceCard = ({
  source,
  isWideLayout = true,
  title,
  onPress,
  hasPermissions,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  return (
    <CardContainer isWideLayout={isWideLayout} {...props}>
      <TouchableOpacity onPress={onPress}>
        <CardImage source={{ uri: source }} defaultSource={baseImage} />
        <CardFooter>
          <H6>{title}</H6>
          {hasPermissions && (
            <TouchableOpacity
              onPress={() => {
                setIsCalloutOpen((state) => !state);
              }}>
              <MaterialIcon
                name="more-vert"
                color={theme.activeTint}
                size={20}
              />
            </TouchableOpacity>
          )}
        </CardFooter>
      </TouchableOpacity>
      {/* TODO close the callout when a user taps another part of the screen  */}
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <ResourceCallout>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="edit"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Edit</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="remove-circle"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Remove</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="file-upload"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Upload</H4Book>
          </Flexbox>
        </ResourceCallout>
      )}
    </CardContainer>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string,
  isWideLayout: PropTypes.bool,
  source: PropTypes.string,
  onPress: PropTypes.func,
  hasPermissions: PropTypes.bool,
};

export default ResourceCard;
