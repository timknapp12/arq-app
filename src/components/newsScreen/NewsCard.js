import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { H4Black, H6Book } from '../common';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../contexts/AppContext';

const CardContainer = styled.View`
  width: 100%;
`;

const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-left-color: ${(props) => props.theme.highlight};
  border-left-width: ${(props) => (props.isNew ? '6px' : '0px')};
  padding: 8px 20px 8px 16px;
  padding-left: ${(props) => (props.isNew ? '10px' : '16px')};
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: 90px;
  height: ${(props) => (props.isExpanded ? 'auto' : '100px')};
  overflow: hidden;
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 4px 0;
`;

const TitleAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NewsCard = ({ title, body, date, url, isNew }) => {
  console.log(`url`, url);
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <CardContainer>
      <OuterContainer isExpanded={isExpanded} isNew={isNew}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
          <InnerContainer>
            <TitleAndDateContainer>
              <H4Black style={{ marginBottom: 4 }}>{title}</H4Black>
              <H6Book style={{ marginEnd: 16 }}>{date}</H6Book>
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
          onPress={() => setIsExpanded((state) => !state)}>
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
  isNew: PropTypes.bool,
};

export default NewsCard;
