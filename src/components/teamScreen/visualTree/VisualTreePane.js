import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated, View } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { Flexbox } from '../../common';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { DraxProvider } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import AppContext from '../../../contexts/AppContext';
import { OuterCircle, ReceivingCircle } from './visualTree.styles';
import { GET_USER } from '../../../graphql/queries';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';

const paddingOffset = 60;

const baseDiameter = 230;

const VisualTreePane = ({ searchId }) => {
  const { theme } = useContext(AppContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);
  //   console.log('idOfDraggedItem', idOfDraggedItem);

  const [treeData, setTreeData] = useState(null);
  const [memberAtTop, setMemberAtTop] = useState(null);

  console.log('searchId', searchId);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    variables: { legacyAssociateId: searchId },
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  if (loading) {
    console.log('loading');
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (searchId !== 0) {
      getUser();
    }
  }, [searchId]);

  const setSearchedMember = (item) => ({
    associateId: item?.associateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
  });

  useEffect(() => {
    if (data) {
      const filteredData = findMembersInDownlineOneLevel(
        data?.treeNodeFor?.childTreeNodes,
        'AMBASSADOR',
      );
      setTreeData(filteredData);
      const topLevelMember = setSearchedMember(data?.treeNodeFor);
      setMemberAtTop(topLevelMember);
      fadeIn();
    }
  }, [data]);

  const uplineId = -1;

  const treeListCopy = treeData ? [...treeData] : [];

  const outerCircleDiameter = treeData?.length
    ? baseDiameter + treeData?.length * 22
    : baseDiameter;

  const radius = outerCircleDiameter / 2 - paddingOffset;

  const [outsideList, insideItem] =
    reformatListForVisualTreeBubbles(treeListCopy);

  const onDragStart = (item) => {
    setReceiveCirlceBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.associateId);
  };

  const onDragEnd = () => setReceiveCirlceBorderColor(theme.disabledTextColor);

  const onDragDrop = () => setReceiveCirlceBorderColor(theme.disabledTextColor);

  const onDragStartUpline = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.associateId);
  };

  const onDragEndUpline = () =>
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);

  const onDragDropUpline = () =>
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);

  const OuterCircleAnimatedContainer = Animated.createAnimatedComponent(View);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  return (
    <DraxProvider>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        horizontal
      >
        <Flexbox onStartShouldSetResponder={() => true}>
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
            {memberAtTop && (
              <VisualTreeBubble
                style={{ position: 'absolute', top: -7, left: 3 }}
                item={memberAtTop}
                draggable={true}
                onDragStart={() => onDragStartUpline({ id: -1 })}
                onDragEnd={onDragEndUpline}
                onDragDrop={onDragDropUpline}
                payload={-1}
              />
            )}
          </ReceivingCircle>

          <OuterCircleAnimatedContainer
            style={{
              opacity: fadeAnim,
            }}
          >
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
              {outsideList.length > 0 &&
                outsideList?.map((item, index) => (
                  <VisualTreeBubble
                    key={item?.associateId}
                    item={item?.associate}
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
                            (360 / outsideList?.length) *
                              ((index * Math.PI) / 180),
                          ),
                      left:
                        radius +
                        radius *
                          Math.sin(
                            (360 / outsideList?.length) *
                              ((index * Math.PI) / 180),
                          ),
                    }}
                  />
                ))}
              {insideItem !== null && (
                <VisualTreeBubble
                  onPress={() => console.log('on Press')}
                  onLongPress={() => console.log('on Long Press')}
                  item={insideItem?.associate}
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
          </OuterCircleAnimatedContainer>

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
      </ScrollView>
    </DraxProvider>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
};

export default VisualTreePane;
