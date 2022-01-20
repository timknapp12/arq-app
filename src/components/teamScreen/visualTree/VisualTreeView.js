import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Flexbox } from '../../common';
import mockTreeData from './mockTreeData';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { DraxProvider, DraxView } from 'react-native-drax';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

const innerCircleDimensions = 60;

const radius = 150 - 42;

const OuterCircle = styled.View`
  margin: 20px 0;
  border: 1px solid white;
  padding: 0 12px 12px 12px;
  position: relative;
`;

const InnerCircle = styled(DraxView)`
  height: ${innerCircleDimensions}px;
  width: ${innerCircleDimensions}px;
  border-radius: ${innerCircleDimensions / 2}px;
  background-color: ${({ color }) => color};
  margin-top: 12px;
  position: absolute;
`;

const ReceivingCircle = styled(DraxView)`
  height: ${innerCircleDimensions + 4}px;
  width: ${innerCircleDimensions + 4}px;
  border-radius: ${innerCircleDimensions + 4 / 2}px;
  border: 1px solid white;
`;

const VisibilityTreeView = () => {
  const outerCircleDiameter = 300;

  const [outsideList, insideItem] =
    reformatListForVisualTreeBubbles(mockTreeData);

  return (
    <Flexbox
      justify="flex-start"
      width="95%"
      height="100%"
      padding={4}
      style={{ zIndex: -1, maxWidth: 425 }}
    >
      <DraxProvider>
        <Flexbox>
          <ReceivingCircle
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(`Entered ${payload}`);
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
              console.log(`LEAVING ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(`REVEIVED ${payload}`);
            }}
          />
          <OuterCircle
            style={{
              width: outerCircleDiameter,
              height: outerCircleDiameter,
              borderRadius: outerCircleDiameter / 2,
            }}
          >
            {outsideList?.map((item, index) => (
              <TouchableOpacity
                key={item.id}
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
              >
                <InnerCircle
                  color={item.color}
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  payload="world"
                />
              </TouchableOpacity>
            ))}
            {insideItem !== null && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: radius - 0,
                  left: radius + 12,
                }}
              >
                <InnerCircle
                  color={insideItem.color}
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  payload="world"
                />
              </TouchableOpacity>
            )}
          </OuterCircle>
          <ReceivingCircle
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
