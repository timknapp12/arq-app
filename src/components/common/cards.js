import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import baseImage from '../../../assets/icons/image.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../contexts/AppContext';
import { H6, H4Book } from './texts';
import { Flexbox } from './containers';

// RESOURCES CARD
const containerHeight = 224;
const footerHeight = 48;

const CardContainer = styled.View`
  flex: ${(props) => (props.isWideLayout ? '0 1 100%' : '0 1 48%')};
  height: ${containerHeight}px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

CardContainer.propTypes = {
  isWideLayout: PropTypes.bool,
};

const CardImage = styled.Image`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: ${containerHeight - footerHeight}px;
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

const Callout = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: ${containerHeight}px;
`;

export const ResourcesCard = ({
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
        <Callout>
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
        </Callout>
      )}
    </CardContainer>
  );
};

ResourcesCard.propTypes = {
  title: PropTypes.string,
  isWideLayout: PropTypes.bool,
  source: PropTypes.string,
  onPress: PropTypes.func,
  hasPermissions: PropTypes.bool,
};

// ASSET CARD
const AssetContainer = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;

export const AssetCard = ({ title, onPress, ...props }) => {
  const { theme } = useContext(AppContext);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  return (
    <AssetContainer {...props}>
      <TouchableOpacity onPress={onPress}>
        <H6>{title}</H6>
        <TouchableOpacity
          onPress={() => {
            setIsCalloutOpen((state) => !state);
          }}>
          <MaterialIcon name="more-vert" color={theme.activeTint} size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
      {/* TODO close the callout when a user taps another part of the screen  */}
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <Callout>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="heart"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Favorite</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="download"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Download</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="share-variant"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Share</H4Book>
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
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="chevron-down"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Down</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="chevron-up"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Up</H4Book>
          </Flexbox>
        </Callout>
      )}
    </AssetContainer>
  );
};

AssetCard.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};
