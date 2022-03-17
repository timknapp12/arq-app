import React, { useState, useContext } from 'react';
import { Flexbox } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';
import TeamScreenContext from '../../../contexts/TeamScreenContext';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

const VisibilityTreeView = ({ ...props }) => {
  const {
    closeMenus,
    paneOneSearchId,
    paneTwoSearchId,
    paneThreeSearchId,
    paneOneSearchLevel,
    paneTwoSearchLevel,
    paneThreeSearchLevel,
  } = useContext(TeamScreenContext);
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

export default VisibilityTreeView;
