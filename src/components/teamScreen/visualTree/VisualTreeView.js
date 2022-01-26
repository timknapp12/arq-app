import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, MainScrollView } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

// source for drag n drop library https://github.com/nuclearpasta/react-native-drax#usage

const VisibilityTreeView = ({ paneOneId, paneTwoId, paneThreeId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPane, setSelectedPane] = useState(1);

  console.log('paneOneId', paneOneId);
  console.log('paneTwoId', paneTwoId);
  console.log('paneThreeId', paneThreeId);

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
        paneOneId={paneOneId}
        paneTwoId={paneTwoId}
        paneThreeId={paneThreeId}
      />
      <MainScrollView>
        {selectedPane === 1 && <VisualTreePane />}
      </MainScrollView>
    </Flexbox>
  );
};

VisibilityTreeView.propTypes = {
  paneOneId: PropTypes.number,
  paneTwoId: PropTypes.number,
  paneThreeId: PropTypes.number,
};

export default VisibilityTreeView;
