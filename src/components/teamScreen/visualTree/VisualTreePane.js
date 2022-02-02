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
  console.log('idOfDraggedItem', idOfDraggedItem);

  const [treeData, setTreeData] = useState(null);
  const [memberAtTop, setMemberAtTop] = useState(null);
  const [uplineMember, setUplineMember] = useState(null);

  // console.log('searchId', searchId);

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
    associateId: item?.associate?.associateId,
    legacyAssociateId: item?.associate?.legacyAssociateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
    associateType: item?.associate?.associateType,
    associateStatus: item?.associate?.associateStatus,
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
      const upline = setSearchedMember(data?.treeNodeFor?.uplineTreeNode);
      setUplineMember(upline);
      fadeIn();
    }
  }, [data]);

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

  const onDragEnd = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDrop = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragStartUpline = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.associateId);
  };

  const onDragEndUpline = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDropUpline = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const OuterCircleAnimatedContainer = Animated.createAnimatedComponent(View);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  return (
    <DraxProvider>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100%',
        }}
        style={{
          width: '100%',
          minHeight: '100%',
          zIndex: -1,
        }}
        horizontal
      >
        <Flexbox
          onStartShouldSetResponder={() => true}
          align="center"
          justify="center"
        >
          {uplineMember && (
            <Flexbox padding={20}>
              <VisualTreeBubble
                item={uplineMember}
                draggable={true}
                onDragStart={() => onDragStart(uplineMember)}
                onDragEnd={onDragEnd}
                onDragDrop={onDragDrop}
                payload="world"
                position="relative"
                isBeingDragged={idOfDraggedItem === uplineMember?.associateId}
              />
            </Flexbox>
          )}
          <ReceivingCircle
            style={{
              opacity: fadeAnim,
            }}
            borderColor={receiveCirlceBorderColor}
            receivingStyle={
              memberAtTop?.associateId !== idOfDraggedItem && {
                backgroundColor: 'green',
              }
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
                longPressDelay={200}
                onDragStart={() => onDragStartUpline(memberAtTop)}
                onDragEnd={onDragEndUpline}
                onDragDrop={onDragDropUpline}
                payload={'test'}
                isBeingDragged={idOfDraggedItem === memberAtTop?.associateId}
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
                memberAtTop?.associateId === idOfDraggedItem && {
                  backgroundColor: 'green',
                }
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
                    key={item?.associate?.associateId}
                    item={item?.associate}
                    draggable={true}
                    // longPressDelay={200}
                    // onPress={() => console.log('on Press')}
                    // onLongPress={() => console.log('on Long Press')}
                    onDragStart={() => onDragStart(item?.associate)}
                    onDragEnd={onDragEnd}
                    onDragDrop={onDragDrop}
                    payload="world"
                    isBeingDragged={
                      idOfDraggedItem === item?.associate?.associateId
                    }
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
                  onDragStart={() => onDragStart(insideItem?.associate)}
                  onDragEnd={onDragEnd}
                  onDragDrop={onDragDrop}
                  payload="middle bubble"
                  isBeingDragged={
                    idOfDraggedItem === insideItem?.associate?.associateId
                  }
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
            style={{
              opacity: fadeAnim,
            }}
            borderColor={receiveCirlceBorderColor}
            receivingStyle={{ backgroundColor: 'green' }}
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
