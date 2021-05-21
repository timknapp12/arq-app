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

const NewsCard = ({ title, body, date, url, isNew, ...props }) => {
  const options = {
    month: 'short',
    day: 'numeric',
  };

  const { theme, deviceLanguage } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStillNew, setIsStillNew] = useState(isNew);
  return (
    <CardContainer {...props}>
      <OuterContainer isExpanded={isExpanded} isStillNew={isStillNew}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setIsStillNew(false);
            // TODO add a mutation that indicates the item has been read and is no longer new
            url ? Linking.openURL(url) : {};
          }}>
          <InnerContainer>
            <TitleAndDateContainer>
              <H4Black style={{ marginBottom: 4 }}>{title}</H4Black>
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
};

export default NewsCard;
