import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';
import { View } from 'react-native';

const NewsCardMap = ({ items }) => {
  return (
    <View>
      {items.map((item, index) => (
        <NewsCard
          style={{ zIndex: -index }}
          key={item.id}
          url={item.url}
          title={item.title}
          body={item.body}
          isNew={item.isNew}
          date={item.date}
        />
      ))}
    </View>
  );
};

NewsCardMap.propTypes = {
  items: PropTypes.array,
};

export default NewsCardMap;
