import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Flexbox, H6Secondary } from '../../common';
import mockTreeData from './mockTreeData';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { DraxProvider, DraxView } from 'react-native-drax';
import { LinearGradient } from 'expo-linear-gradient';
import AppContext from '../../../contexts/AppContext';

// source for finding coordinates https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//   (x, y) = (rx * cos(θ), ry * sin(θ)) to find coordinates on a circle

const innerCircleDiameter = 96;
const paddingOffset = 50;
const radius = 150 - paddingOffset;

const OuterCircle = styled.View`
  margin: 20px 0;
  border-width: 2px;
  border-color: ${(props) => props.theme.cardBackgroundColor}
  padding: 0 12px 12px 12px;
  position: relative;
`;

const innerCircleDimensions = {
  height: innerCircleDiameter,
  width: innerCircleDiameter,
  borderRadius: innerCircleDiameter / 2,
  paddingTop: 4,
  justifyContent: 'space-around',
  alignItems: 'center',
};

const InnerCircle = styled(DraxView)`
  ${innerCircleDimensions};
  margin-top: 10px;
  position: absolute;
`;

const LevelIndicator = styled.View`
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  height: ${innerCircleDiameter / 4}px;
  width: 100%;
  position: absolute;
  bottom: 0;
  opacity: 0.5;
`;

const ReceivingCircle = styled(DraxView)`
  height: ${innerCircleDiameter + 8}px;
  width: ${innerCircleDiameter + 8}px;
  border-radius: ${innerCircleDiameter + 8 / 2}px;
  border-width: 3px;
  border-color: ${(props) => props.theme.disabledTextColor};
`;

const activityIndicatorDiameter = 14;

const ActivityIndicator = styled.View`
  width: ${activityIndicatorDiameter}px;
  height: ${activityIndicatorDiameter}px;
  border-radius: ${activityIndicatorDiameter + 8 / 2}px;
  background-color: green;
`;

const VisibilityTreeView = () => {
  const { theme } = useContext(AppContext);

  const outerCircleDiameter = 320;

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
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  payload="world"
                >
                  <LinearGradient
                    colors={[theme.disabledTextColor, theme.backgroundColor]}
                    style={innerCircleDimensions}
                    start={{ x: 0.1, y: 0.1 }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <ActivityIndicator />
                      <H6Secondary style={{ fontSize: 12 }}>
                        {item?.firstName}
                      </H6Secondary>
                      <H6Secondary style={{ fontSize: 12 }}>
                        {item?.lastName}
                      </H6Secondary>
                    </View>
                    <LevelIndicator />
                  </LinearGradient>
                </InnerCircle>
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
                  onDragStart={() => {
                    console.log('start drag');
                  }}
                  payload="world"
                >
                  <LinearGradient
                    colors={[theme.disabledTextColor, theme.backgroundColor]}
                    style={innerCircleDimensions}
                    start={{ x: 0.1, y: 0.1 }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <ActivityIndicator />
                      <H6Secondary style={{ fontSize: 12 }}>
                        {insideItem?.firstName}
                      </H6Secondary>
                      <H6Secondary style={{ fontSize: 12 }}>
                        {insideItem?.lastName}
                      </H6Secondary>
                    </View>
                    <LevelIndicator />
                  </LinearGradient>
                </InnerCircle>
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
