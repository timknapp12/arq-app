import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  ...props
}) => {
  const [selectedPane, setSelectedPane] = useState(1);

  return (
    <Flexbox
      justify="flex-start"
      width="100%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
      {...props}
    >
      <VisualTreeSearchBar
        selectedPane={selectedPane}
        setSelectedPane={setSelectedPane}
        paneOneSearchId={paneOneSearchId}
        paneTwoSearchId={paneTwoSearchId}
        paneThreeSearchId={paneThreeSearchId}
        paneOneSearchLevel={paneOneSearchLevel}
        paneTwoSearchLevel={paneTwoSearchLevel}
        paneThreeSearchLevel={paneThreeSearchLevel}
      />
      <VisualTreePane
        style={{ display: selectedPane === 1 ? 'flex' : 'none' }}
        searchId={paneOneSearchId}
        level={paneOneSearchLevel}
        closeMenus={closeMenus}
      />
      <VisualTreePane
        style={{ display: selectedPane === 2 ? 'flex' : 'none' }}
        searchId={paneTwoSearchId}
        level={paneTwoSearchLevel}
        closeMenus={closeMenus}
      />
      <VisualTreePane
        style={{
          display: selectedPane === 3 ? 'flex' : 'none',
        }}
        searchId={paneThreeSearchId}
        level={paneThreeSearchLevel}
        closeMenus={closeMenus}
      />
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
