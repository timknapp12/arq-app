import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';
import { View } from 'react-native';

const NewsCardMap = ({ items, isMenuOpen, closeMenus }) => {
  return (
    <View>
      {items.map(
        (item, index) =>
          index > 0 && (
            <NewsCard
              key={item?.linkId}
              linkId={item?.linkId}
              url={item?.linkUrl}
              title={item?.linkTitle}
              body={item?.linkDescription}
              isRead={item?.isViewedByAssociate}
              date={item?.dateStart}
              isMenuOpen={isMenuOpen}
              closeMenus={closeMenus}
            />
          ),
      )}
    </View>
  );
};

NewsCardMap.propTypes = {
  items: PropTypes.array,
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenus: PropTypes.func.isRequired,
};

export default NewsCardMap;
