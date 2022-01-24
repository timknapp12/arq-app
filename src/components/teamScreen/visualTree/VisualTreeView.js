import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Flexbox } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

// source for drag n drop library https://github.com/nuclearpasta/react-native-drax#usage

const VisibilityTreeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPane, setSelectedPane] = useState(1);

  return (
    <Flexbox
      justify="flex-start"
      width="95%"
      height="120%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <VisualTreeSearchBar
        selectedPane={selectedPane}
        setSelectedPane={setSelectedPane}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ScrollView>{selectedPane === 1 && <VisualTreePane />}</ScrollView>
    </Flexbox>
  );
};

export default VisibilityTreeView;
