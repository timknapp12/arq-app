import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { Flexbox, LoadingSpinner, H4 } from '../../common';
import reformatListForVisualTreeBubbles from '../../../utils/teamView/reformatListForVisualTreeBubbles';
import { DraxProvider } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import AppContext from '../../../contexts/AppContext';
import { OuterCircle, ReceivingCircle } from './visualTree.styles';
import { GET_USER } from '../../../graphql/queries';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';
import { Localized } from '../../../translations/Localized';

const paddingOffset = 60;

const baseDiameter = 230;

const VisualTreePane = ({ searchId, level }) => {
  const { theme } = useContext(AppContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);
  // console.log('idOfDraggedItem', idOfDraggedItem);

  const [treeData, setTreeData] = useState(null);
  const [focusedMember, setFocusedMember] = useState(null);
  const [uplineMember, setUplineMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [levelOfFocusedMember, setLevelOfFocusedMember] = useState(null);

  // console.log('searchId', searchId);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    variables: { legacyAssociateId: searchId },
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (searchId !== 0) {
      getUser();
    }
  }, [searchId]);

  const reshapeMember = (item) => ({
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
      const topLevelMember = reshapeMember(data?.treeNodeFor);
      setFocusedMember(topLevelMember);
      const upline = reshapeMember(data?.treeNodeFor?.uplineTreeNode);
      setUplineMember(upline);
      fadeIn();
    }
  }, [data]);

  useEffect(() => {
    setIsOutsideBubbleEntering(focusedMember?.associate === idOfDraggedItem);
  }, [focusedMember, idOfDraggedItem]);

  useEffect(() => {
    if (level) {
      setLevelOfFocusedMember(level);
    }
  }, [level]);

  const treeListCopy = treeData ? [...treeData] : [];

  const outerCircleDiameter = treeData?.length
    ? baseDiameter + treeData?.length * 24
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  if (loading) {
    setTimeout(() => {
      return <LoadingSpinner style={{ marginTop: 10 }} size="large" />;
    }, 500);
  }

  return (
    <DraxProvider>
      {searchId !== 0 ? (
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
            // style={{
            //   opacity: fadeAnim,
            // }}
          >
            {uplineMember && (
              <Flexbox padding={20}>
                <VisualTreeBubble
                  member={uplineMember}
                  draggable={true}
                  onDragStart={() => onDragStart(uplineMember)}
                  onDragEnd={onDragEnd}
                  onDragDrop={onDragDrop}
                  payload={uplineMember?.legacyAssociateId}
                  position="relative"
                  isBeingDragged={idOfDraggedItem === uplineMember?.associateId}
                  level={levelOfFocusedMember - 1}
                />
              </Flexbox>
            )}
            <ReceivingCircle
              // style={{
              //   opacity: fadeAnim,
              // }}
              borderColor={receiveCirlceBorderColor}
              receivingStyle={
                focusedMember?.associateId !== idOfDraggedItem && {
                  backgroundColor: 'green',
                }
              }
              onReceiveDragEnter={() => {
                focusedMember?.associateId !== idOfDraggedItem &&
                  setIsOutsideBubbleEntering(true);
              }}
              onReceiveDragExit={() => {
                setIsOutsideBubbleEntering(false);
              }}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                console.log(`REVEIVED ${payload}`);
                if (payload !== idOfDraggedItem) {
                  getUser({ variables: { legacyAssociateId: payload } });
                  fadeOut();
                  if (payload === uplineMember?.legacyAssociateId) {
                    setLevelOfFocusedMember((state) => state - 1);
                  } else {
                    setLevelOfFocusedMember((state) => state + 1);
                  }
                }
              }}
            >
              {focusedMember && !isOutsideBubbleEntering && (
                <VisualTreeBubble
                  style={{ position: 'absolute', top: -7, left: 3 }}
                  member={focusedMember}
                  draggable={true}
                  longPressDelay={200}
                  onDragStart={() => onDragStartUpline(focusedMember)}
                  onDragEnd={onDragEndUpline}
                  onDragDrop={onDragDropUpline}
                  payload={focusedMember?.legacyAssociateId}
                  isBeingDragged={
                    idOfDraggedItem === focusedMember?.associateId
                  }
                  level={levelOfFocusedMember}
                />
              )}
            </ReceivingCircle>

            <OuterCircle
              borderColor={outerCircleReceiveBorderColor}
              receivingStyle={
                focusedMember?.associateId === idOfDraggedItem && {
                  backgroundColor: 'green',
                }
              }
              style={{
                opacity: fadeAnim,
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
                    member={item?.associate}
                    draggable={true}
                    // longPressDelay={200}
                    // onPress={() => console.log('on Press')}
                    // onLongPress={() => console.log('on Long Press')}
                    onDragStart={() => onDragStart(item?.associate)}
                    onDragEnd={onDragEnd}
                    onDragDrop={onDragDrop}
                    payload={item?.associate?.legacyAssociateId}
                    isBeingDragged={
                      idOfDraggedItem === item?.associate?.associateId
                    }
                    level={levelOfFocusedMember + 1}
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
                  member={insideItem?.associate}
                  draggable={true}
                  onDragStart={() => onDragStart(insideItem?.associate)}
                  onDragEnd={onDragEnd}
                  onDragDrop={onDragDrop}
                  payload={insideItem?.associate?.legacyAssociateId}
                  isBeingDragged={
                    idOfDraggedItem === insideItem?.associate?.associateId
                  }
                  level={levelOfFocusedMember + 1}
                  style={{
                    position: 'absolute',
                    top: radius - 0,
                    left: radius + 12,
                  }}
                />
              )}
            </OuterCircle>

            <ReceivingCircle
              // style={{
              //   opacity: fadeAnim,
              // }}
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
      ) : (
        <H4 style={{ textAlign: 'center', marginTop: 16 }}>
          {Localized('Search for a team member')}
        </H4>
      )}
    </DraxProvider>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
  level: PropTypes.number,
};

export default VisualTreePane;
