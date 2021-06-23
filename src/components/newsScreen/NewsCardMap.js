import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';
import { View } from 'react-native';

const NewsCardMap = ({ items, isMenuOpen, fadeOut }) => {
  return (
    <View>
      {items.map((item) => (
        <NewsCard
          key={item.id}
          url={item.url}
          title={item.title}
          body={item.body}
          isNew={item.isNew}
          date={item.date}
          isMenuOpen={isMenuOpen}
          fadeOut={fadeOut}
        />
      ))}
    </View>
  );
};

NewsCardMap.propTypes = {
  items: PropTypes.array,
  isMenuOpen: PropTypes.bool.isRequired,
  fadeOut: PropTypes.func.isRequired,
};

export default NewsCardMap;
