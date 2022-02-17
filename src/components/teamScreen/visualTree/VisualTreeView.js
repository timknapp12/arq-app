import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Flexbox } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

// source for drag n drop library https://github.com/nuclearpasta/react-native-drax#usage

const VisibilityTreeView = ({
  closeMenus,
  paneOneSearchId,
  paneTwoSearchId,
  paneThreeSearchId,
  paneOneSearchLevel,
  paneTwoSearchLevel,
  paneThreeSearchLevel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPane, setSelectedPane] = useState(1);

  console.log('paneTwoSearchLevel', paneTwoSearchLevel);
  console.log('paneThreeSearchLevel', paneThreeSearchLevel);

  const scrollViewRef = useRef(null);

  return (
    <Flexbox
      justify="flex-start"
      width="100%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <VisualTreeSearchBar
        selectedPane={selectedPane}
        setSelectedPane={setSelectedPane}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        paneOneSearchId={paneOneSearchId}
        paneTwoSearchId={paneTwoSearchId}
        paneThreeSearchId={paneThreeSearchId}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 140,
        }}
        style={{
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        ref={scrollViewRef}
        onContentSizeChange={(_, height) => {
          scrollViewRef?.current?.scrollTo({ y: height, amimated: true });
        }}
      >
        {selectedPane === 1 && (
          <VisualTreePane
            searchId={paneOneSearchId}
            level={paneOneSearchLevel}
            closeMenus={closeMenus}
          />
        )}
      </ScrollView>
    </Flexbox>
  );
};

VisibilityTreeView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
  paneOneSearchId: PropTypes.number,
  paneTwoSearchId: PropTypes.number,
  paneThreeSearchId: PropTypes.number,
  paneOneSearchLevel: PropTypes.number,
  paneTwoSearchLevel: PropTypes.number,
  paneThreeSearchLevel: PropTypes.number,
};

export default VisibilityTreeView;
