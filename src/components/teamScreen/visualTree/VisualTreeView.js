import React, { useState, useContext } from 'react';
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
    pane1SearchId,
    pane2SearchId,
    pane3SearchId,
    pane1SearchLevel,
    pane2SearchLevel,
    pane3SearchLevel,
  } = useContext(TeamScreenContext);

  const [pane1ActiveMember, setPane1ActiveMember] = useState(null);
  const [pane2ActiveMember, setPane2ActiveName] = useState(null);
  const [pane3ActiveMember, setPane3ActiveMember] = useState(null);

  const [pane1HasContent, setPane1HasContent] = useState(false);
  const [pane2HasContent, setPane2HasContent] = useState(false);
  const [pane3HasContent, setPane3HasContent] = useState(false);

  return (
    <Flexbox
      justify="flex-start"
      width="100%"
      height="100%"
      style={{ zIndex: -1 }}
      {...props}
    >
      <VisualTreeSearchBar
        selectedVisualTreePane={selectedVisualTreePane}
        setSelectedVisualTreePane={setSelectedVisualTreePane}
        pane1ActiveMember={pane1ActiveMember}
        pane2ActiveMember={pane2ActiveMember}
        pane3ActiveMember={pane3ActiveMember}
        pane1HasContent={pane1HasContent}
        setPane1HasContent={setPane1HasContent}
        pane2HasContent={pane2HasContent}
        setPane2HasContent={setPane2HasContent}
        pane3HasContent={pane3HasContent}
        setPane3HasContent={setPane3HasContent}
      />
      <DraxProvider>
        {/* the 2 empty Views are necessary for the autoscroll to work in DraxScrollView in VisualTreePane */}
        <View />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 1 ? 'flex' : 'none' }}
          searchId={pane1SearchId}
          level={pane1SearchLevel}
          closeMenus={closeMenus}
          pane={1}
          setActiveBubbleMember={setPane1ActiveMember}
        />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 2 ? 'flex' : 'none' }}
          searchId={pane2SearchId}
          level={pane2SearchLevel}
          closeMenus={closeMenus}
          pane={2}
          setActiveBubbleMember={setPane2ActiveName}
        />
        <VisualTreePane
          style={{ display: selectedVisualTreePane === 3 ? 'flex' : 'none' }}
          searchId={pane3SearchId}
          level={pane3SearchLevel}
          closeMenus={closeMenus}
          pane={3}
          setActiveBubbleMember={setPane3ActiveMember}
        />
        <View />
      </DraxProvider>
    </Flexbox>
  );
};

export default VisualTreeView;
