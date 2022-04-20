import React, { useContext } from 'react';
import { View } from 'react-native';
import { DraxProvider } from 'react-native-drax';
import { Flexbox } from '../../common';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import VisualTreePane from './VisualTreePane';
import TeamScreenContext from '../../../contexts/TeamScreenContext';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

const VisualTreeView = ({ ...props }) => {
  const {
    closeMenus,
    selectedVisualTreePane,
    setSelectedVisualTreePane,
    paneOneSearchId,
    paneTwoSearchId,
    paneThreeSearchId,
    paneOneSearchLevel,
    paneTwoSearchLevel,
    paneThreeSearchLevel,
  } = useContext(TeamScreenContext);

  return (
    <Flexbox
      justify="flex-start"
      width="100%"
      height="100%"
      padding={4}
      style={{ zIndex: -1 }}
      {...props}
    >
      <VisualTreeSearchBar
        selectedVisualTreePane={selectedVisualTreePane}
        setSelectedVisualTreePane={setSelectedVisualTreePane}
      />
      <DraxProvider>
        {/* the 2 empty Views are necessary for the autoscroll to work in DraxScrollView in VisualTreePane */}
        <View />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 1 ? 'flex' : 'none' }}
          searchId={paneOneSearchId}
          level={paneOneSearchLevel}
          closeMenus={closeMenus}
          pane={1}
        />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 2 ? 'flex' : 'none' }}
          searchId={paneTwoSearchId}
          level={paneTwoSearchLevel}
          closeMenus={closeMenus}
          pane={2}
        />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 3 ? 'flex' : 'none' }}
          searchId={paneThreeSearchId}
          level={paneThreeSearchLevel}
          closeMenus={closeMenus}
          pane={3}
        />
        <View />
      </DraxProvider>
    </Flexbox>
  );
};

export default VisualTreeView;
