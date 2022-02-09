import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, MainScrollView } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

// source for drag n drop library https://github.com/nuclearpasta/react-native-drax#usage

const VisibilityTreeView = ({
  paneOneSearchId,
  paneTwoSearchId,
  paneThreeSearchId,
  paneOneSearchLevel,
  paneTwoSearchLevel,
  paneThreeSearchLevel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPane, setSelectedPane] = useState(1);

  console.log('paneOneSearchId', paneOneSearchId);
  console.log('paneTwoSearchId', paneTwoSearchId);
  console.log('paneThreeSearchId', paneThreeSearchId);

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
      <MainScrollView minimumZoomScale={0.5} maximumZoomScale={5}>
        {selectedPane === 1 && (
          <VisualTreePane
            searchId={paneOneSearchId}
            level={paneOneSearchLevel}
          />
        )}
      </MainScrollView>
    </Flexbox>
  );
};

VisibilityTreeView.propTypes = {
  paneOneSearchId: PropTypes.number,
  paneTwoSearchId: PropTypes.number,
  paneThreeSearchId: PropTypes.number,
  paneOneSearchLevel: PropTypes.number,
  paneTwoSearchLevel: PropTypes.number,
  paneThreeSearchLevel: PropTypes.number,
};

export default VisibilityTreeView;
