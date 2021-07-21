import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Linking, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H4Black, H6Book } from '../common';
import AppContext from '../../contexts/AppContext';
import {
  CardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDateContainer,
} from './NewsCard.styles';

const NewsCard = ({
  title,
  body,
  date,
  url,
  isRead,
  isMenuOpen,
  fadeOut,
  ...props
}) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadYet, setIsReadYet] = useState(isRead);

  const openLink = () => {
    if (isMenuOpen) {
      return fadeOut();
    }
    setIsReadYet(true);
    url ? Linking.openURL(url) : {};
  };

  const options = {
    month: 'short',
    day: 'numeric',
  };

  let [y, m, d, hh, mm, ss, ms] = date.match(/\d+/g);
  let regexDate = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
  let formattedDate = regexDate.toLocaleString(deviceLanguage, options);

  return (
    <CardContainer {...props}>
      <OuterContainer isExpanded={isExpanded} isReadYet={!isReadYet}>
        <TouchableOpacity
          /* active opacity changes depending on whether the touch event is outside the click boundary of the menu */
          activeOpacity={isMenuOpen ? 1 : 0.2}
          style={{ flex: 1 }}
          onPress={openLink}>
          <InnerContainer>
            <TitleAndDateContainer>
              <H4Black
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ marginBottom: 4, flex: 1 }}>
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
                style={{ flex: 1 }}>
                {body}
              </H6Book>
            ) : (
              <H6Book
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{ flex: 1 }}>
                {body}
              </H6Book>
            )}
          </InnerContainer>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', top: 8, right: 4 }}
          onPress={() => {
            setIsReadYet(true);
            setIsExpanded((state) => !state);
          }}>
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
  title: PropTypes.string,
  body: PropTypes.string,
  url: PropTypes.string,
  date: PropTypes.string,
  isRead: PropTypes.bool,
  isMenuOpen: PropTypes.bool.isRequired,
  fadeOut: PropTypes.func.isRequired,
};

export default NewsCard;
