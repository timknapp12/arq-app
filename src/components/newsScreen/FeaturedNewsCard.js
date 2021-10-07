import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { TouchableOpacity, Dimensions, Linking, Platform } from 'react-native';
import { H4Black, H6Book } from '../common';
import defaultImage from '../../../assets/icons/image.png';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import { NEWS_STORY_HAS_BEEN_VIEWED } from '../../graphql/mutations';

const { width } = Dimensions.get('window');
const imageHeight = width / 2;

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  margin-bottom: 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const BannerImage = styled.Image`
  width: ${width}px;
  height: ${imageHeight}px;
`;

const TitleAndDescriptionContainer = styled.View`
  padding: 4px;
  border-left-color: ${(props) => props.theme.highlight};
  border-left-width: ${(props) => (props.isReadYet ? '6px' : '0px')};
  padding-left: ${(props) => (props.isReadYet ? '10px' : '16px')};
  border-bottom-left-radius: 5px;
`;

const FeaturedNewsCard = ({
  linkId,
  url,
  imageUrl,
  title,
  body,
  isRead,
  isMenuOpen,
  closeMenus,
}) => {
  const { associateId } = useContext(AppContext);
  const {
    refetchNews,
    displayNotifications,
    setDisplayNotifications,
    showAddOptions,
  } = useContext(LoginContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const [isReadYet, setIsReadYet] = useState(isRead);

  const [storyHasBeenViewed] = useMutation(NEWS_STORY_HAS_BEEN_VIEWED, {
    variables: { associateId, linkId, linkViewId: 0 },
    onCompleted: () => refetchNews(),
    onError: (error) => console.log(`error`, error),
  });

  const openLink = () => {
    if (isMenuOpen) {
      return closeMenus();
    }
    // don't allow opening if notifications is open
    if (displayNotifications && Platform.OS === 'android') {
      return;
    }
    // close notifications window if it is open instead of opening link
    if (displayNotifications && Platform.OS === 'ios') {
      return setDisplayNotifications(false);
    }
    if (Platform.OS === 'android' && showAddOptions) {
      return closeAddOptions();
    }
    if (Platform.OS === 'ios') {
      closeAddOptions();
    }
    setIsReadYet(true);
    storyHasBeenViewed();
    url ? Linking.openURL(url) : {};
  };

  return (
    <TouchableOpacity
      activeOpacity={isMenuOpen || displayNotifications ? 1 : 0.2}
      onPress={openLink}
    >
      <Container>
        <BannerImage source={{ uri: imageUrl }} defaultSource={defaultImage} />
        <TitleAndDescriptionContainer isReadYet={!isReadYet}>
          <H4Black
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ marginBottom: 4 }}
          >
            {title}
          </H4Black>
          <H6Book ellipsizeMode="tail" numberOfLines={5} style={{ flex: 1 }}>
            {body}
          </H6Book>
        </TitleAndDescriptionContainer>
      </Container>
    </TouchableOpacity>
  );
};

FeaturedNewsCard.propTypes = {
  linkId: PropTypes.number.isRequired,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  isRead: PropTypes.bool,
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenus: PropTypes.func.isRequired,
};

export default FeaturedNewsCard;
