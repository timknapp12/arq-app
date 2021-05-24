import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions, Linking } from 'react-native';
import { H4Black, H6Book, Flexbox } from '../common';
import defaultImage from '../../../assets/icons/image.png';

const { width } = Dimensions.get('window');
const imageHeight = width / 2;

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  margin-bottom: 10px;
`;

const BannerImage = styled.Image`
  width: ${width}px;
  height: ${imageHeight}px;
`;

const FeaturedNewsCard = ({ url, title, body, isMenuOpen }) => {
  const openLink = () => {
    url ? Linking.openURL(url) : {};
  };
  return (
    <Container>
      <TouchableOpacity disabled={isMenuOpen} onPress={openLink}>
        <BannerImage source={{ uri: url }} defaultSource={defaultImage} />
        <Flexbox align="flex-start" padding={4}>
          <H4Black style={{ marginBottom: 4 }}>{title}</H4Black>
          <H6Book ellipsizeMode="tail" numberOfLines={5} style={{ flex: 1 }}>
            {body}
          </H6Book>
        </Flexbox>
      </TouchableOpacity>
    </Container>
  );
};

FeaturedNewsCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default FeaturedNewsCard;
