import React, { useState, useContext } from 'react';
import { Flexbox } from '../../common';
import mockTreeData from './mockTreeData';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import VisualTreeSearchBar from './VisualTreeSearchBar';
import { DraxProvider } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import AppContext from '../../../contexts/AppContext';
import { OuterCircle, ReceivingCircle } from './visualTree.styles';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

// source for drag n drop library https://github.com/nuclearpasta/react-native-drax#usage

const paddingOffset = 50;
const radius = 150 - paddingOffset;

const VisibilityTreeView = () => {
  const { theme } = useContext(AppContext);

  const [selectedPane, setSelectedPane] = useState(1);
  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);
  console.log('idOfDraggedItem', idOfDraggedItem);
  const uplineId = -1;

  const outerCircleDiameter = 320;

  const treeListCopy = [...mockTreeData];

  const [outsideList, insideItem] =
    reformatListForVisualTreeBubbles(treeListCopy);

  const onDragStart = (item) => {
    setReceiveCirlceBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item.id);
  };

  const onDragEnd = () => setReceiveCirlceBorderColor(theme.disabledTextColor);

  const onDragDrop = () => setReceiveCirlceBorderColor(theme.disabledTextColor);

  const onDragStartUpline = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item.id);
  };

  const onDragEndUpline = () =>
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);

  const onDragDropUpline = () =>
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);

  return (
    <Flexbox
      justify="flex-start"
      width="95%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <VisualTreeSearchBar
        selectedPane={selectedPane}
        setSelectedPane={setSelectedPane}
      />
      <DraxProvider>
        <Flexbox>
          <ReceivingCircle
            borderColor={receiveCirlceBorderColor}
            receivingStyle={
              uplineId !== idOfDraggedItem && { backgroundColor: 'green' }
            }
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(`Entered ${payload}`);
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
              console.log(`LEAVING ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(`REVEIVED ${payload}`);
            }}
          >
            <VisualTreeBubble
              style={{ position: 'absolute', top: -9, left: 3 }}
              item={{ id: -1, firstName: 'Upline', lastName: 'Smithson' }}
              draggable={true}
              onDragStart={() => onDragStartUpline({ id: -1 })}
              onDragEnd={onDragEndUpline}
              onDragDrop={onDragDropUpline}
              payload={-1}
            />
          </ReceivingCircle>
          <OuterCircle
            borderColor={outerCircleReceiveBorderColor}
            receivingStyle={
              uplineId === idOfDraggedItem && { backgroundColor: 'green' }
            }
            style={{
              width: outerCircleDiameter,
              height: outerCircleDiameter,
              borderRadius: outerCircleDiameter / 2,
            }}
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(`Entered ${payload}`);
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
              console.log(`LEAVING ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(`REVEIVED ${payload}`);
            }}
          >
            {outsideList?.map((item, index) => (
              <VisualTreeBubble
                key={item.id}
                item={item}
                draggable={true}
                longPressDelay={200}
                onPress={() => console.log('on Press')}
                onLongPress={() => console.log('on Long Press')}
                onDragStart={() => onDragStart(item)}
                onDragEnd={onDragEnd}
                onDragDrop={onDragDrop}
                payload="world"
                style={{
                  top:
                    radius -
                    radius *
                      Math.cos(
                        (360 / outsideList.length) * ((index * Math.PI) / 180),
                      ),
                  left:
                    radius +
                    radius *
                      Math.sin(
                        (360 / outsideList.length) * ((index * Math.PI) / 180),
                      ),
                }}
              />
            ))}
            {insideItem !== null && (
              <VisualTreeBubble
                onPress={() => console.log('on Press')}
                onLongPress={() => console.log('on Long Press')}
                item={insideItem}
                draggable={true}
                onDragStart={() => onDragStart(insideItem)}
                onDragEnd={onDragEnd}
                onDragDrop={onDragDrop}
                payload="middle bubble"
                style={{
                  position: 'absolute',
                  top: radius - 0,
                  left: radius + 12,
                }}
              />
            )}
          </OuterCircle>
          <ReceivingCircle
            borderColor={receiveCirlceBorderColor}
            receivingStyle={
              uplineId !== idOfDraggedItem && { backgroundColor: 'green' }
            }
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(`Entered ${payload}`);
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
              console.log(`LEAVING ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(`RECEIVED ${payload}`);
            }}
          />
        </Flexbox>
      </DraxProvider>
    </Flexbox>
  );
};

export default VisibilityTreeView;
