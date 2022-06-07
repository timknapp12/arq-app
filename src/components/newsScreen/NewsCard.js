import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { TouchableOpacity, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Analytics from 'expo-firebase-analytics';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H4Black, H6Book } from '../common';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import { NEWS_STORY_HAS_BEEN_VIEWED } from '../../graphql/mutations';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
} from './NewsCard.styles';
import getLocalDate from '../../translations/getLocalDate/getLocalDate';

const NewsCard = ({
  linkId,
  title,
  body,
  date,
  url,
  isRead,
  isMenuOpen,
  closeMenus,
  ...props
}) => {
  const { theme, deviceLanguage, associateId } = useContext(AppContext);
  const { refetchNews, showAddOptions } = useContext(LoginContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadYet, setIsReadYet] = useState(isRead);

  const [storyHasBeenViewed] = useMutation(NEWS_STORY_HAS_BEEN_VIEWED, {
    variables: { associateId, linkId, linkViewId: 0 },
    onCompleted: () => {
      refetchNews();
      const formattedTitle = title.split(' ').join('_');
      const shortenedTitle = formattedTitle.slice(0, 21) + '_news_story_viewed';
      const strippedTitle = shortenedTitle.replace(/\W/g, '');
      Analytics.logEvent(strippedTitle);
    },
    onError: (error) => console.log(`error`, error),
  });

  const openLink = () => {
    if (isMenuOpen) {
      return closeMenus();
    }
    if (Platform.OS === 'android' && showAddOptions) {
      return closeAddOptions();
    }
    if (Platform.OS === 'ios') {
      closeAddOptions();
    }
    setIsReadYet(true);
    storyHasBeenViewed();
    url ? WebBrowser.openBrowserAsync(url) : {};
  };

  const options = 'MMM DD';
  const formattedDate = getLocalDate(date, deviceLanguage, options);

  return (
    <CardContainer {...props}>
      <OuterContainer isExpanded={isExpanded} isReadYet={!isReadYet}>
        <TouchableOpacity
          activeOpacity={isMenuOpen ? 1 : 0.2}
          style={{ flex: 1 }}
          onPress={openLink}
        >
          <InnerContainer>
            <TitleAndDateContainer>
              <H4Black
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ marginBottom: 4, flex: 1 }}
              >
                {title}
              </H4Black>
              {formattedDate ? (
                <H6Book style={{ marginEnd: 16 }}>{formattedDate}</H6Book>
              ) : null}
            </TitleAndDateContainer>
            {isExpanded ? (
              <H6Book
                ellipsizeMode="tail"
                numberOfLines={20}
                style={{ flex: 1 }}
              >
                {body}
              </H6Book>
            ) : (
              <H6Book
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{ flex: 1 }}
              >
                {body}
              </H6Book>
            )}
          </InnerContainer>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', top: 8, right: 4 }}
          onPress={() => {
            storyHasBeenViewed();
            setIsReadYet(true);
            setIsExpanded((state) => !state);
            closeMenus();
          }}
        >
          <MaterialCommunityIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={theme.primaryTextColor}
            size={24}
          />
        </TouchableOpacity>
      </OuterContainer>
    </CardContainer>
  );
};

NewsCard.propTypes = {
  linkId: PropTypes.number.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  url: PropTypes.string,
  date: PropTypes.string,
  isRead: PropTypes.bool,
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenus: PropTypes.func.isRequired,
};

export default NewsCard;
