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
  isNew,
  isMenuOpen,
  fadeOut,
  ...props
}) => {
  const options = {
    month: 'short',
    day: 'numeric',
  };

  const { theme, deviceLanguage } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStillNew, setIsStillNew] = useState(isNew);

  const openLink = () => {
    if (isMenuOpen) {
      return fadeOut();
    }
    setIsStillNew(false);
    url ? Linking.openURL(url) : {};
  };

  return (
    <CardContainer {...props}>
      <OuterContainer isExpanded={isExpanded} isStillNew={isStillNew}>
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
              {date ? (
                <H6Book style={{ marginEnd: 16 }}>
                  {date.toLocaleDateString(deviceLanguage, options)}
                </H6Book>
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
            setIsStillNew(false);
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
  date: PropTypes.object,
  isNew: PropTypes.bool,
  isMenuOpen: PropTypes.bool.isRequired,
  fadeOut: PropTypes.func.isRequired,
};

export default NewsCard;
