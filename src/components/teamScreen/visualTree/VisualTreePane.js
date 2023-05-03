import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import { LoadingSpinner, H5 } from '../../common';
import { DraxScrollView } from 'react-native-drax';
import VisualTreeBubble from './VisualTreeBubble';
import VisualTreePaneSection from './VisualTreePaneSection';
import PlacementsContainer from './PlacementsContainer';
import { VisualTreeContainer, ReceivingCircle } from './visualTree.styles';
import { GET_USER } from '../../../graphql/queries';
import {
  isWithinPlaceTime,
  findMembersInDownlineOneLevel,
} from '../../../utils/teamView/filterDownline';
import isLegacyAssociateIdInArray from '../../../utils/teamView/isLegacyAssociateIdInArray';
import { Localized } from '../../../translations/Localized';
// Contexts
import AppContext from '../../../contexts/AppContext';
import TeamScreenContext from '../../../contexts/TeamScreenContext';
import LoginContext from '../../../contexts/LoginContext';

const getAssociatesEligibleForPlacement = (associateData) => {
  if (
    !associateData ||
    !associateData.enrollmentChildTreeNodes ||
    !associateData.childTreeNodes
  ) {
    return [];
  }
  const intersection = associateData.enrollmentChildTreeNodes.filter((obj1) =>
    associateData.childTreeNodes.some(
      (obj2) => obj2.associate.associateId === obj1.associate.associateId,
    ),
  );

  const ambassadorsOnly = intersection.filter((obj1) => {
    return obj1.associate.associateType.toLowerCase() === 'ambassador';
  });

  const recentEnough = ambassadorsOnly.filter((obj1) => {
    return isWithinPlaceTime(obj1.associate.dateSignedUp);
  });
  return recentEnough;
};

const VisualTreePane = ({
  searchId,
  level,
  closeMenus,
  style,
  setActiveBubbleMember,
  activeBubbleMember,
  setPaneHasContent,
  paneHasContent,
}) => {
  const { theme } = useContext(AppContext);
  const { isViewReset, setIsViewReset } = useContext(TeamScreenContext);
  const { user } = useContext(LoginContext);

  const [receiveCirlceBorderColor, setReceiveCirlceBorderColor] = useState(
    theme.disabledTextColor,
  );

  const [idOfDraggedItem, setIdOfDraggedItem] = useState(null);

  const [treeData, setTreeData] = useState(null);
  const [focusedMember, setFocusedMember] = useState(null);
  const [isOutsideBubbleEntering, setIsOutsideBubbleEntering] = useState(false);
  const [levelOfFocusedMember, setLevelOfFocusedMember] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER, {
    onError: (error) =>
      console.log('error in get user in VisualTreePane.js', error),
    onCompleted: () => {
      setPaneHasContent(true);
      setActiveBubbleMember(null);
    },
  });

  const emptySearchId = 0;
  useEffect(() => {
    if (searchId !== emptySearchId) {
      getUser({ variables: { legacyAssociateId: searchId } });
    }
  }, [searchId, level]);

  const reshapeMember = (item) => ({
    associateId: item?.associate?.associateId,
    legacyAssociateId: item?.associate?.legacyAssociateId,
    firstName: item?.associate?.firstName,
    lastName: item?.associate?.lastName,
    associateType: item?.associate?.associateType,
    associateStatus: item?.associate?.associateStatus,
    uplineId: item?.uplineTreeNode?.associate?.legacyAssociateId,
    enrollerId: item?.uplineEnrollmentTreeNode?.associate?.legacyAssociateId,
    ovRankName: item?.rank?.rankName,
    ovRankId: item?.rank?.rankId,
    cvRankName: item?.customerSalesRank?.rankName,
    cvRankId: item?.customerSalesRank?.customerSalesRankId,
    ov: item?.ov,
    cv: item?.cv,
    dateSignedUp: item?.associate?.dateSignedUp,
  });

  useEffect(() => {
    if (!data) return;
    const filteredData = findMembersInDownlineOneLevel(
      data?.treeNodeFor?.childTreeNodes,
      'AMBASSADOR',
    );
    setTreeData(filteredData);
    const topLevelMember = reshapeMember(data?.treeNodeFor);
    setFocusedMember(topLevelMember);
    setIsViewReset(false);
  }, [data, isViewReset]);

  useEffect(() => {
    setIsOutsideBubbleEntering(focusedMember?.associate === idOfDraggedItem);
  }, [focusedMember, idOfDraggedItem]);

  useEffect(() => {
    if (level) {
      setLevelOfFocusedMember(level);
    }
  }, [level]);

  const onDragStartFocused = (item, level) => {
    setIdOfDraggedItem(item?.legacyAssociateId);
    setActiveBubbleMember({ ...item, level });
    closeMenus();
    fadeDown();
    Analytics.logEvent('visual_tree_bubble_tapped');
  };

  const onDragEndFocused = () => {
    setIdOfDraggedItem(null);
  };

  const onDragDropFocused = () => {
    setIdOfDraggedItem(null);
  };

  const isAValidDropToTopCirlce = isLegacyAssociateIdInArray(
    treeData,
    idOfDraggedItem,
  );

  const onReceiveDragDrop = (payload) => {
    if (!isAValidDropToTopCirlce) return;
    getUser({
      variables: {
        legacyAssociateId: payload?.legacyAssociateId,
      },
    });
    setLevelOfFocusedMember((state) => state + 1);
  };

  const scrollViewRef = useRef(null);

  // this is needed to keep track of when the user scrolls horizontally to adjust absolute position of bubbles if the scrollview is wider than 100% width
  const onHorizontalScroll = ({ contentOffset }) => {
    setHorizontalOffset(contentOffset.x);
  };

  const associatesEligibleForPlacement =
    getAssociatesEligibleForPlacement(user);

  // PLACEMENT SUITE
  const [hidePlacementContainer, setHidePlacementContainer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const initialValue = -64;
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  const fadeUp = () => {
    setIsExpanded(true);
    Animated.timing(fadeAnim, {
      toValue: 80,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const fadeDown = () => {
    setIsExpanded(false);
    Animated.timing(fadeAnim, {
      toValue: initialValue,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return <LoadingSpinner style={{ marginTop: 20 }} size="large" />;
  }

  return (
    <DraxScrollView
      contentContainerStyle={{
        paddingBottom: 200,
      }}
      style={{
        zIndex: -1,
        ...style,
      }}
      ref={scrollViewRef}
      onContentSizeChange={(_, height) => {
        scrollViewRef?.current?.scrollTo({ y: height, amimated: true });
      }}
    >
      {searchId !== 0 ? (
        <ScrollView
          contentContainerStyle={{
            minWidth: '100%',
            minHeight: '100%',
          }}
          style={{
            minHeight: '100%',
            zIndex: -1,
            marginTop: 16,
          }}
          onScroll={({ nativeEvent }) => onHorizontalScroll(nativeEvent)}
          scrollEventThrottle={16}
          //the nested ScrollView with 'horizontal' prop allows for scrolling horizontally, while the parent ScrollView allows vertical
          horizontal
        >
          <TouchableWithoutFeedback onPress={closeMenus}>
            <VisualTreeContainer onStartShouldSetResponder={() => true}>
              <ReceivingCircle
                borderColor={receiveCirlceBorderColor}
                receivingStyle={
                  isAValidDropToTopCirlce && {
                    backgroundColor: theme.dropZoneBackgroundColor,
                  }
                }
                onReceiveDragEnter={() => {
                  isAValidDropToTopCirlce && setIsOutsideBubbleEntering(true);
                }}
                onReceiveDragExit={() => {
                  setIsOutsideBubbleEntering(false);
                }}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                  onReceiveDragDrop(payload);
                  Analytics.logEvent('visual_tree_bubble_dropped');
                }}
              >
                {focusedMember && !isOutsideBubbleEntering && (
                  <VisualTreeBubble
                    style={{ position: 'absolute', top: -7, left: 3 }}
                    member={focusedMember}
                    draggable={true}
                    longPressDelay={200}
                    onDragStart={() =>
                      onDragStartFocused(focusedMember, levelOfFocusedMember)
                    }
                    onDragEnd={onDragEndFocused}
                    onDragDrop={onDragDropFocused}
                    payload={focusedMember}
                    isBeingDragged={
                      idOfDraggedItem === focusedMember?.legacyAssociateId
                    }
                    level={levelOfFocusedMember}
                    horizontalOffset={horizontalOffset}
                    selected={
                      activeBubbleMember?.associateId ===
                      focusedMember?.associateId
                    }
                  />
                )}
              </ReceivingCircle>

              <VisualTreePaneSection
                level={levelOfFocusedMember + 1}
                parentData={treeData}
                focusedMember={focusedMember}
                setTopCirlceBorderColor={setReceiveCirlceBorderColor}
                setIdOfDraggedItemForParent={setIdOfDraggedItem}
                closeMenus={closeMenus}
                horizontalOffset={horizontalOffset}
                setActiveBubbleMember={setActiveBubbleMember}
                activeBubbleMember={activeBubbleMember}
                fadeDown={fadeDown}
                setHidePlacementContainer={setHidePlacementContainer}
              />
            </VisualTreeContainer>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
        <H5 style={{ textAlign: 'center', marginTop: 16 }}>
          {Localized('Search for a team member')}
        </H5>
      )}
      {paneHasContent && !hidePlacementContainer && (
        <PlacementsContainer
          associatesEligibleForPlacement={associatesEligibleForPlacement}
          isExpanded={isExpanded}
          fadeAnim={fadeAnim}
          fadeUp={fadeUp}
          fadeDown={fadeDown}
        />
      )}
    </DraxScrollView>
  );
};

VisualTreePane.propTypes = {
  searchId: PropTypes.number.isRequired,
  level: PropTypes.number,
  closeMenus: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  setActiveBubbleMember: PropTypes.func.isRequired,
  activeBubbleMember: PropTypes.object,
  setPaneHasContent: PropTypes.func.isRequired,
  paneHasContent: PropTypes.bool.isRequired,
};

export default VisualTreePane;
