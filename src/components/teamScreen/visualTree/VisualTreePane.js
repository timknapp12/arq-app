import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { Flexbox, LoadingSpinner, H5 } from '../../common';
import { DraxProvider } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import VisualTreePaneSection from './VisualTreePaneSection';
import AppContext from '../../../contexts/AppContext';
import { AnimatedContainer, ReceivingCircle } from './visualTree.styles';
import { GET_USER } from '../../../graphql/queries';
import { findMembersInDownlineOneLevel } from '../../../utils/teamView/filterDownline';
import { Localized } from '../../../translations/Localized';

const VisualTreePane = ({ searchId, level }) => {
  const { theme, legacyId } = useContext(AppContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );
  const [outerCircleReceiveBorderColor, setOuterCircleReceiveBorderColor] =
    useState(theme.disabledTextColor);
  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);

  const [treeData, setTreeData] = useState(null);
  const [focusedMember, setFocusedMember] = useState(null);
  const [uplineMember, setUplineMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [levelOfFocusedMember, setLevelOfFocusedMember] = useState(null);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
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
      console.log('searchId', searchId);
      getUser({ variables: { legacyAssociateId: searchId } });
    }
  }, [searchId, level]);
  // TODO
  // reset downline bubbles after a parent is changed
  // scroll to bottom of container
  // handle proper receiving areas styles and functionality
  // handle draggable=false
  // add stats for dragging bubbles

  const reshapeMember = (item) => ({
    associateId: item?.associate?.associateId,
    legacyAssociateId: item?.associate?.legacyAssociateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
    associateType: item?.associate?.associateType,
    associateStatus: item?.associate?.associateStatus,
    uplineId: item?.uplineNode?.associate?.legacyAssociateId,
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
      setTimeout(() => {
        fadeIn();
      }, 500);
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

  const onDragStart = (item) => {
    setReceiveCirlceBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
  };

  const onDragEnd = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDrop = () => {
    setReceiveCirlceBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragStartFocused = (item) => {
    setOuterCircleReceiveBorderColor(theme.primaryButtonBackgroundColor);
    setIdOfDraggedItem(item?.legacyAssociateId);
  };

  const onDragEndFocused = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const onDragDropFocused = () => {
    setOuterCircleReceiveBorderColor(theme.disabledTextColor);
    setIdOfDraggedItem(null);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  if (loading) {
    setTimeout(() => {
      return <LoadingSpinner style={{ marginTop: 10 }} size="large" />;
    }, 500);
  }

  const scrollViewRef = useRef();

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
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (scrollViewRef !== null) {
              scrollViewRef.current.scrollToEnd({ animated: false });
            }
          }}
        >
          <AnimatedContainer
            onStartShouldSetResponder={() => true}
            style={{ opacity: fadeAnim }}
          >
            {uplineMember && (
              <Flexbox padding={20}>
                <VisualTreeBubble
                  member={uplineMember}
                  draggable={uplineMember?.legacyAssociateId !== legacyId}
                  onDragStart={() => onDragStart(uplineMember)}
                  onDragEnd={onDragEnd}
                  onDragDrop={onDragDrop}
                  payload={uplineMember}
                  position="relative"
                  isBeingDragged={
                    idOfDraggedItem === uplineMember?.legacyAssociateId
                  }
                  level={levelOfFocusedMember - 1}
                />
              </Flexbox>
            )}
            <ReceivingCircle
              borderColor={receiveCirlceBorderColor}
              receivingStyle={
                focusedMember?.legacyAssociateId !== idOfDraggedItem && {
                  backgroundColor: 'green',
                }
              }
              onReceiveDragEnter={() => {
                focusedMember?.legacyAssociateId !== idOfDraggedItem &&
                  setIsOutsideBubbleEntering(true);
              }}
              onReceiveDragExit={() => {
                setIsOutsideBubbleEntering(false);
              }}
              onReceiveDragDrop={({ dragged: { payload } }) => {
                if (
                  payload?.legacyAssociateId !==
                  focusedMember?.legacyAssociateId
                ) {
                  getUser({
                    variables: {
                      legacyAssociateId: payload?.legacyAssociateId,
                    },
                  });
                  fadeOut();
                  if (
                    payload?.legacyAssociateId ===
                    uplineMember?.legacyAssociateId
                  ) {
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
                  onDragStart={() => onDragStartFocused(focusedMember)}
                  onDragEnd={onDragEndFocused}
                  onDragDrop={onDragDropFocused}
                  payload={focusedMember}
                  isBeingDragged={
                    idOfDraggedItem === focusedMember?.legacyAssociateId
                  }
                  level={levelOfFocusedMember}
                />
              )}
            </ReceivingCircle>

            <VisualTreePaneSection
              level={levelOfFocusedMember + 1}
              parentData={treeData}
              fadeIn={fadeIn}
            />
          </AnimatedContainer>
        </ScrollView>
      ) : (
        <H5 style={{ textAlign: 'center', marginTop: 16 }}>
          {Localized('Search for a team member')}
        </H5>
      )}
    </DraxProvider>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
  level: PropTypes.number,
};

export default VisualTreePane;
