import React, { useState } from 'react';
import { View } from 'react-native';
import PieChart from './PieChart';
import CardForAtAGlance from './CardForAtAGlance';
import { Gap, H4Black } from '../../common';
import { categoriesForAtAGlance } from './categoriesForAtAGlance';

const AtAGlanceView = ({ ...props }) => {
  const initialCategory = categoriesForAtAGlance?.[0];
  const [category, setCategory] = useState(initialCategory);
  console.log(`category`, category);
  return (
    <View {...props}>
      <H4Black style={{ textAlign: 'center' }}>{category?.title ?? ''}</H4Black>
      <PieChart data={category?.data || []} accessor="population" />
      {categoriesForAtAGlance.map((item) => (
        <View key={item?.id}>
          <Gap height="8px" />
          <CardForAtAGlance
            title={item?.title}
            value={item?.value}
            onPress={() => setCategory(item)}
            selected={category?.title === item?.title}
          />
        </View>
      ))}
    </View>
  );
};

export default AtAGlanceView;
